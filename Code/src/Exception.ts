export interface IException {
    name: string;
    message: string;
    stack?: string;
    cause?: IException;
}

/**
 * Baseclass of all other exception classes.
 */
export class Exception extends Error implements IException {
    public readonly cause?: Error;
    public readonly data: Record<PropertyKey, any>;
    private readonly _stackTrace?: string;

    public constructor(message: string, cause?: Error) {
        super(message);
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

    public get stack(): string {
        let dataEntries = this._stringifyData();
        if (dataEntries)
            dataEntries += '\n';

        if (!this.cause)
            return `${this.name}: ${this.message}\n${dataEntries}${this._stackTrace}`;

        const cause = this.cause.stack ?? `${this.cause.name}: ${this.cause.message}`;
        return `${this.name}: ${this.message} --> ${cause}\n--- End of inner exception stack trace ---\n${dataEntries}${this._stackTrace}`;
    }

    private _stringifyData(): string {
        return Reflect.ownKeys(this.data).map((key: PropertyKey) => {
            const name = typeof key === 'symbol' ?
                ((key as any).description ?? key.toString().slice(7, -1)) : // .slice is a walk around to get symbol description in old environments
                key;

            return `${name}: ${this.data[key]}`;
        }).join('\n');
    }

    public toString(): string {
        return this.stack;
    }

    public toJSON(): IException {
        return Exception.toJSON(this, WeakSet ? new WeakSet() : new Set());
    }

    /**
     * @deprecated The property should not be used. Use instead .cause
     */
    public get innerException(): Error | undefined {
        return this.cause;
    }

    public static isError(ex: any): ex is Error {
        return ex instanceof Error ||
            ex instanceof Exception ||
            (ex && (ex.stack || ex.stack === '') && (ex.name || ex.name === '') && (ex.message || ex.message === ''));
    }

    public static fromObject(ex: any): Error {
        if (Exception.isError(ex))
            return ex;
        if (typeof ex === 'string' || ex instanceof String)
            return new Exception(ex.toString());
        return new ChuckNorrisException(ex);
    }

    private static toJSON(exception: IException, visitedObjects: WeakSet<IException> | Set<IException>): IException {
        if (visitedObjects.has(exception))
            return {
                name: '[Circular] ' + exception.name,
                message: exception.message,
                stack: exception.stack
            };

        visitedObjects.add(exception);

        if (exception.cause)
            return {
                name: exception.name,
                message: exception.message,
                stack: exception.stack,
                cause: this.toJSON(exception.cause, visitedObjects)
            };

        return {
            name: exception.name,
            message: exception.message,
            stack: exception.stack
        };
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
