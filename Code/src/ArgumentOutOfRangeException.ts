import {ArgumentException} from './ArgumentException';

/**
 * Exception that will be thrown if a value is out of a range.
 */
export class ArgumentOutOfRangeException extends ArgumentException {
    public readonly actualValue: any;

    public constructor(argumentName: string, actualValue: any, message?: string, innerException?: Error);
    public constructor(argumentName: string, actualValue: any, innerException?: Error);
    public constructor(argumentName: string, actualValue: any, messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            argumentName,
            typeof messageOrInnerException === 'string' ?
                `${messageOrInnerException}\nValue: ${actualValue}` :
                `Value is out of range.\nValue: ${actualValue}`,
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
        this.actualValue = actualValue;
    }
}
