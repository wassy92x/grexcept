import {Exception, ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if an object or string doesn't fulfill the excepted format.
 */
export class InvalidFormatException extends Exception {
    public constructor(message?: string, cause?: ExceptionLike);
    public constructor(cause?: ExceptionLike);
    public constructor(messageOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Format is invalid.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}