import {ArgumentException} from './ArgumentException';

export type ExceptionLike = {
    readonly message: string,
    readonly name: string,
    readonly stack?: string,
    readonly cause?: ExceptionLike,
    readonly data?: { [k: PropertyKey]: any }
};

/**
 * Baseclass of all other exception classes.
 */
export class Exception extends Error {
    public readonly cause?: ExceptionLike;
    public readonly data: { [k: PropertyKey]: any };
    private readonly _stackTrace?: string;

    public constructor(message: string, cause?: ExceptionLike) {
        super(message);
        Object.defineProperty(this, 'stack', { // Walk around to print stack in case of passing exception object to console. (works only in browser)
            get: this._buildStacktrace,
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(this, 'data', {
            ...Object.getOwnPropertyDescriptor(this, 'data'),
            enumerable: false
        });
        Object.defineProperty(this, 'cause', {
            ...Object.getOwnPropertyDescriptor(this, 'cause'),
            enumerable: false
        });
        Object.defineProperty(this, '_stackTrace', {
            ...Object.getOwnPropertyDescriptor(this, '_stackTrace'),
            enumerable: false
        });
        this.name = this.constructor.name;
        this.data = {};
        this.cause = cause;
        if (typeof (Error as any).captureStackTrace === 'function') {
            const capturedStack = {stack: ''};
            (Error as any).captureStackTrace(capturedStack, this.constructor);
            this._stackTrace = capturedStack.stack.substring(capturedStack.stack.indexOf('\n') + 1); // Remove classname and message
        } else {
            const capturedStack = (new Error()).stack || '';
            this._stackTrace = capturedStack.substring(capturedStack.indexOf('\n', capturedStack.indexOf('\n') + 1) + 1); // Remove classname, message and first line of stackTrace
        }
    }

    protected _buildStacktrace(): string {
        let dataEntries = this._dataToString();
        if (dataEntries)
            dataEntries += '\n';

        if (!this.cause)
            return `${this.name}: ${this.message}\n${dataEntries}${this._stackTrace}`;

        const cause = this.cause.stack ?? `${this.cause.name}: ${this.cause.message}`;
        return `${this.name}: ${this.message} --> ${cause}\n--- End of inner exception stack trace ---\n${dataEntries}${this._stackTrace}`;
    }

    private _dataToString(): string {
        return Reflect.ownKeys(this.data).map((key: PropertyKey) => {
            const name = typeof key === 'symbol' ?
                ((key as any).description ?? key.toString().slice(7, -1)) : // .slice is a walk around to get symbol description in old environments
                key;

            return `${name}: ${this.data[key]}`;
        }).join('\n');
    }

    public toString(): string {
        return this._buildStacktrace();
    }

    public toJSON(): object {
        return Exception._toJSON(this, WeakSet ? new WeakSet() : new Set());
    }

    public static isError(ex: any): ex is ExceptionLike {
        return ex instanceof Error ||
            ex instanceof Exception ||
            (ex && (typeof ex.stack === 'string' || typeof ex.stack === 'undefined') && typeof ex.name === 'string' && typeof ex.message === 'string');
    }

    public static fromObject(ex: any): ExceptionLike {
        if (Exception.isError(ex))
            return ex;
        if (typeof ex === 'string' || ex instanceof String)
            return new Exception(ex.toString());
        return new ChuckNorrisException(ex);
    }

    protected static _toJSON(exception: ExceptionLike, visitedObjects: WeakSet<object> | Set<object>): ExceptionLike {
        const result: { -readonly [K in keyof ExceptionLike]: ExceptionLike[K] } = {
            name: exception.name,
            message: exception.message
        };
        const alreadyVisited = visitedObjects.has(exception);

        if (exception.cause && !alreadyVisited) {
            visitedObjects.add(exception);
            result.cause = this._toJSON(exception.cause, visitedObjects);
        } else if(!alreadyVisited) {
            visitedObjects.add(exception);

            if (exception.stack)
                result.stack = exception.stack;

            if (exception.data)
                result.data = JsonConverter.convert(
                    Reflect.ownKeys(exception.data).reduce((res: any, key: string | symbol) => {
                        let keyName: string;
                        if (typeof key === 'symbol') {
                            keyName = ((key as any).description ?? key.toString().slice(7, -1))
                                .toLowerCase()
                                .replace(/[-_\s.]+(.)?/g, (_: string, c: string) => c ? c.toUpperCase() : '');
                            keyName = keyName.substring(0, 1).toLowerCase() + keyName.substring(1);

                        } else {
                            keyName = key;
                        }
                        res[keyName] = exception.data![key];
                        return res;
                    }, {})
                );
        } else {
            if (exception.stack)
                result.stack = '[Circular!] ' + exception.stack.substring(0, exception.stack.indexOf('\n', exception.stack.indexOf('\n') + 1));
            else
                result.stack = '[Circular!]';
        }

        return result
    }
}

/**
 * Exception that will be thrown if a plain object is thrown somewhere else.
 */
export class ChuckNorrisException extends Exception {
    private readonly _exceptionObject: symbol;

    public constructor(exceptionObject: any) {
        super('An error occurred.');
        if (typeof exceptionObject === 'object') {
            for (const [key, value] of Object.entries(exceptionObject))
                this.data[key] = value;
        }
        this._exceptionObject = Symbol('Original exception object');
        this.data[this._exceptionObject] = exceptionObject;
    }

    public get exceptionObject(): any {
        return this.data[this._exceptionObject];
    }
}

class JsonConverter {
    public static convert(rawObject: object): object {
        if (typeof rawObject !== 'object' || rawObject === null)
            throw new ArgumentException('rawObject');

        return this._convertObjectToJson(rawObject, WeakSet ? new WeakSet() : new Set());
    }

    public static _convertObjectToJson(rawObject: object, visitedObjects: WeakSet<object> | Set<object>): object {
        visitedObjects.add(rawObject);
        if (rawObject instanceof Map)
            return this._convertMapToJson(rawObject, visitedObjects);
        else if (this._isIterable(rawObject))
            return this._convertIterableToJson(rawObject, visitedObjects);
        return this._convertSimpleObjectToJson(rawObject, visitedObjects);
    }

    public static _isIterable(o: any): o is Iterable<any> {
        return o && typeof o[Symbol.iterator] === 'function';
    }

    public static _convertSimpleObjectToJson(rawObject: any, visitedObjects: WeakSet<object> | Set<object>): object {
        if (typeof rawObject.toJSON === 'function') {
            const json = rawObject.toJSON();
            return typeof json === 'string' ? JSON.parse(json) : json;
        }

        const objProperties = Object.keys(rawObject);
        const result: any = {};
        for (const property of objProperties) {
            const isPrivate = /^_|#.+/.test(property.toString());
            if (isPrivate)
                continue;

            const value = rawObject[property];
            const typeOfValue = typeof value;
            if (typeOfValue === 'string' || typeOfValue === 'boolean' || typeOfValue === 'number' || value === null) {
                result[property] = value;
            } else if (typeOfValue === 'object') {
                if (!visitedObjects.has(value))
                    result[property] = this._convertObjectToJson(value, visitedObjects);
            }
        }
        return result;
    }

    public static _convertMapToJson(map: Map<any, any>, visitedObjects: WeakSet<object> | Set<object>): object {
        const result: any = {};
        for (let [key, value] of map) {
            let keyType = typeof key;
            if (keyType === 'symbol') {
                key = ((key as any).description ?? key.toString().slice(7, -1));
                keyType = 'string';
            }

            if (keyType !== 'string' && keyType !== 'number')
                continue;

            const valueType = typeof value;
            if (valueType === 'string' || valueType === 'boolean' || valueType === 'number' || value === null) {
                result[key] = value;
            } else if (valueType === 'object') {
                if (!visitedObjects.has(value))
                    result[key] = this._convertObjectToJson(value, visitedObjects);
            }
        }
        return result;
    }

    public static _convertIterableToJson(iterable: Iterable<any>, visitedObjects: WeakSet<object> | Set<object>): any[] {
        const result = [];
        for (const value of iterable) {
            const typeOfValue = typeof value;
            if (typeOfValue === 'string' || typeOfValue === 'boolean' || typeOfValue === 'number' || value === null) {
                result.push(value);
            } else if (typeOfValue === 'object') {
                if (!visitedObjects.has(value))
                    result.push(this._convertObjectToJson(value, visitedObjects));
            }
        }
        return result;
    }
}
