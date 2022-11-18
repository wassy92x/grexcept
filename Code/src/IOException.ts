import {Exception, ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if an input or output error occurred.
 */
export class IOException extends Exception {
    public constructor(cause?: ExceptionLike);
    public constructor(message?: string, cause?: ExceptionLike);
    public constructor(messageOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'I/O error occurred.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}
