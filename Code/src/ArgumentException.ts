import {Exception, ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if a value is invalid.
 */
export class ArgumentException extends Exception {
    private readonly _argumentName: symbol;

    public constructor(argumentName: PropertyKey, message?: string, cause?: ExceptionLike);
    public constructor(argumentName: PropertyKey, cause?: Error);
    public constructor(argumentName: PropertyKey, messageOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Value is invalid',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
        Object.defineProperty(this, '_argumentName', {
            ...Object.getOwnPropertyDescriptor(this, '_argumentName'),
            enumerable: false
        });
        this._argumentName = Symbol('Argument name');
        this.data[this._argumentName] = argumentName;
    }

    public get argumentName(): PropertyKey {
        return this.data[this._argumentName];
    }
}
