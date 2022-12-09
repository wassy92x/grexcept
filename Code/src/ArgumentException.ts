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
        Object.defineProperty(this, '_argumentName', {
            ...Object.getOwnPropertyDescriptor(this, '_argumentName'),
            enumerable: false
        });
        this._argumentName = this.data.add('Argument name', argumentName);
    }

    public get argumentName(): PropertyKey {
        return this.data.get(this._argumentName);
    }
}
