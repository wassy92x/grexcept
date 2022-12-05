import {ArgumentException} from './ArgumentException';
import {ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if a value is out of a range.
 */
export class ArgumentOutOfRangeException extends ArgumentException {
    private readonly _actualValue: symbol;

    public constructor(argumentName: PropertyKey, actualValue: any, message?: string, cause?: ExceptionLike);
    public constructor(argumentName: PropertyKey, actualValue: any, cause?: ExceptionLike);
    public constructor(argumentName: PropertyKey, actualValue: any, messageOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
        super(
            argumentName,
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Value is out of range.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
        Object.defineProperty(this, '_actualValue', {
            ...Object.getOwnPropertyDescriptor(this, '_actualValue'),
            enumerable: false
        });
        this._actualValue = this.data.add('Value', actualValue);
    }

    public get actualValue(): any {
        return this.data.get(this._actualValue);
    }
}
