import {Exception} from './Exception';

/**
 * Exception that will be thrown if a value is invalid.
 */
export class ArgumentException extends Exception {
    private readonly _argumentName: symbol;

    public constructor(argumentName: PropertyKey, message?: string, innerException?: Error);
    public constructor(argumentName: PropertyKey, innerException?: Error);
    public constructor(argumentName: PropertyKey, messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof messageOrInnerException === 'string' ?
                messageOrInnerException :
                'Value is invalid',
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
        this._argumentName = Symbol('Argument name');
        this.data[this._argumentName] = argumentName;
    }

    public get argumentName(): PropertyKey {
        return this.data[this._argumentName];
    }
}
