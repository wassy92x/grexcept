import {ArgumentException} from './ArgumentException';

/**
 * Exception that will be thrown if a value is out of a range.
 */
export class ArgumentOutOfRangeException extends ArgumentException {
    private readonly _actualValue: symbol;

    public constructor(argumentName: PropertyKey, actualValue: any, message?: string, innerException?: Error);
    public constructor(argumentName: PropertyKey, actualValue: any, innerException?: Error);
    public constructor(argumentName: PropertyKey, actualValue: any, messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            argumentName,
            typeof messageOrInnerException === 'string' ?
                messageOrInnerException :
                'Value is out of range.',
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
        this._actualValue = Symbol('Value');
        this.data[this._actualValue] = actualValue;
    }

    public get actualValue(): any {
        return this.data[this._actualValue];
    }
}
