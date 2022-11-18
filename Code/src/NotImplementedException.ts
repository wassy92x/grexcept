import {Exception, ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if some method or operation is not implemented.
 */
export class NotImplementedException extends Exception {
    public constructor(cause?: ExceptionLike);
    public constructor(message?: string, cause?: ExceptionLike);
    public constructor(messageOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'The method or operation is not implemented.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}