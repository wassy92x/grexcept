import {ArgumentException} from './ArgumentException';
import {ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if a value is null or undefined.
 */
export class ArgumentNullException extends ArgumentException {
    public constructor(argumentName: PropertyKey, message?: string, cause?: ExceptionLike);
    public constructor(argumentName: PropertyKey, cause?: ExceptionLike);
    public constructor(argumentName: PropertyKey, messageOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
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
