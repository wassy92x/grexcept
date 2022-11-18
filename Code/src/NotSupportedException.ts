import {Exception, ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if the called method or operation is not supported.
 */
export class NotSupportedException extends Exception {
    public constructor(cause?: ExceptionLike);
    public constructor(message?: string, cause?: ExceptionLike);
    public constructor(messageOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Specified method or operation is not supported.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}
