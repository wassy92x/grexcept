import {ArgumentException} from './ArgumentException';

/**
 * Exception that will be thrown if a value is null or undefined.
 */
export class ArgumentNullException extends ArgumentException {
    public constructor(argumentName: PropertyKey, message?: string, innerException?: Error);
    public constructor(argumentName: PropertyKey, innerException?: Error);
    public constructor(argumentName: PropertyKey, messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            argumentName,
            typeof messageOrInnerException === 'string' ?
                messageOrInnerException :
                'Value can not be null or undefined.',
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
    }
}
