import {ArgumentException} from './ArgumentException';

/**
 * Exception that will be thrown if a value is out of a range.
 */
export class ArgumentOutOfRangeException extends ArgumentException {
    private readonly _actualValue: symbol;

    public constructor(argumentName: PropertyKey, actualValue: any, message?: string, cause?: Error);
    public constructor(argumentName: PropertyKey, actualValue: any, cause?: Error);
    public constructor(argumentName: PropertyKey, actualValue: any, messageOrCause?: string | Error, cause?: Error) {
        super(
            argumentName,
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Value is out of range.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
        this._actualValue = Symbol('Value');
        this.data[this._actualValue] = actualValue;
    }

    public get actualValue(): any {
        return this.data[this._actualValue];
    }
}
