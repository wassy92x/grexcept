/**
 * Baseclass of all other exception classes.
 */
export class Exception implements Error {
    public readonly name: string;
    public readonly innerException?: Error;
    public readonly message: string;
    private readonly _stackTrace?: string;

    protected constructor(message: string, innerException?: Error) {
        this.name = this.constructor.name;
        this.message = message;
        this.innerException = innerException;
        if (typeof (Error as any).captureStackTrace === 'function') {
            const capturedStack = {stack: ''};
            (Error as any).captureStackTrace(capturedStack, this.constructor);
            this._stackTrace = capturedStack.stack.substr(capturedStack.stack.indexOf('\n') + 1); // Remove classname and message
        } else {
            const capturedStack = (new Error()).stack || '';
            this._stackTrace = capturedStack.substr(capturedStack.indexOf('\n', capturedStack.indexOf('\n') + 1) + 1); // Remove classname, message and first line of stackTrace
        }
    }

    public get stack(): string {
        if (!this.innerException)
            return `${this.name}: ${this.message}\n${this._stackTrace}`;

        const innerException = this.innerException.stack ?? `${this.innerException.name}: ${this.innerException.message}`;
        return `${this.name}: ${this.message} --> ${innerException}\n--- End of inner exception stack trace ---\n${this._stackTrace}`;
    }

    public toString(): string {
        return this.stack;
    }

    public static isError(ex: any): ex is Error {
        return ex instanceof Error ||
            ex instanceof Exception ||
            (ex && (ex.stack || ex.stack === '') && (ex.name || ex.name === '') && (ex.message || ex.message === ''));
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
        super(typeof exceptionObject === 'object' && exceptionObject !== null ?
            `An error occurred.\n${Object.entries(exceptionObject).map(([key, value]) => `${key}: ${value}`).join('\n')}` :
            `An error occurred.\nExceptionObject: ${exceptionObject}`
        );
        this.exceptionObject = exceptionObject;
    }
}
