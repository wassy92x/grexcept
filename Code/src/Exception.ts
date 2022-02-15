/**
 * Baseclass of all other exception classes.
 */
export class Exception implements Error {
    public readonly name: string;
    public readonly innerException?: Error;
    private _message: string;
    private readonly _stack?: string;

    protected constructor(message: string, innerException?: Error) {
        this.name = this.constructor.name;
        this._message = message;
        this.innerException = innerException;
        this._stack = typeof (Error as any).captureStackTrace === 'function' ?
            (Error as any).captureStackTrace(this, this.constructor) :
            (new Error(message)).stack;
    }

    public get message(): string {
        return this._message;
    }

    protected set message(msg: string) {
        this._message = msg;
    }

    public get stack(): string {
        if (!this.innerException)
            return this._stack || `${this.name}: ${this.message}`;

        return `${this.name}: ${this.message}\n${this.innerException.stack ?? `${this.innerException.name}: ${this.innerException.message}`}`;
    }

    public toString(): string {
        return this.stack;
    }

    public static isError(ex: any): ex is Error {
        return ex instanceof Error ||
            ex instanceof Exception ||
            ((ex.stack || ex.stack === '') && (ex.name || ex.name === '') && (ex.message || ex.message === ''));
    }

    public static fromObject(ex: any): Error {
        return Exception.isError(ex) ?
            ex :
            (typeof ex === 'string' || ex instanceof String) ?
                new Exception(ex.toString()) :
                new ChuckNorrisException(ex);
    }
}

/**
 * Exception that will be thrown if a plain object is thrown somewhere else.
 */
export class ChuckNorrisException extends Exception {
    public readonly exceptionObject: any;

    public constructor(exceptionObject: any) {
        super(typeof exceptionObject === 'object' ?
            `An error occurred.\n${Object.entries(exceptionObject).map(([key, value]) => `${key}: ${value}`).join('\n')}` :
            `An error occurred.\nExceptionObject: ${exceptionObject}`
        );
        this.exceptionObject = exceptionObject;
    }
}
