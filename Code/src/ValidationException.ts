import {Exception, ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if a validation of some argument failed.
 */
export class ValidationException extends Exception {
    public constructor(message?: string, cause?: ExceptionLike);
    public constructor(cause?: ExceptionLike);
    public constructor(messageOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Validation failed.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}