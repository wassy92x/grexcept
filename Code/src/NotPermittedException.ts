import {Exception, ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if the callee is not permitted to execute this method or operation.
 */
export class NotPermittedException extends Exception {
    public constructor(cause?: ExceptionLike);
    public constructor(message?: string, cause?: ExceptionLike);
    public constructor(messageOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Callee is not permitted to execute this method or operation.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}
