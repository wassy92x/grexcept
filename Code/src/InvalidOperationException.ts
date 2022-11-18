import {Exception, ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if a call of a method is invalid because of the current state of the object.
 */
export class InvalidOperationException extends Exception {
    public constructor(cause?: ExceptionLike);
    public constructor(message?: string, cause?: ExceptionLike);
    public constructor(messageOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Operation is not valid due to the current state of the object.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}
