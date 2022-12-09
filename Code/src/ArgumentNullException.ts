import {ArgumentException} from './ArgumentException';

/**
 * Exception that will be thrown if a value is null or undefined.
 */
export class ArgumentNullException extends ArgumentException {
    public constructor(argumentName: PropertyKey, message?: string, cause?: Error);
    public constructor(argumentName: PropertyKey, cause?: Error);
    public constructor(argumentName: PropertyKey, messageOrCause?: string | Error, cause?: Error) {
        super(
            argumentName,
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Value can not be null or undefined.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}
