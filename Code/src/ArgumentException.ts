import {Exception} from './Exception';

/**
 * Exception that will be thrown if a value is invalid.
 */
export class ArgumentException extends Exception {
    private readonly _argumentName: symbol;

    public constructor(argumentName: PropertyKey, message?: string, cause?: Error);
    public constructor(argumentName: PropertyKey, cause?: Error);
    public constructor(argumentName: PropertyKey, messageOrCause?: string | Error, cause?: Error) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Value is invalid',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
        this._argumentName = Symbol('Argument name');
        this.data[this._argumentName] = argumentName;
    }

    public get argumentName(): PropertyKey {
        return this.data[this._argumentName];
    }
}
