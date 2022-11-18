import {Exception, ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if an operation get's aborted for some reason. For example a timeout has been reached.
 */
export class OperationAbortedException extends Exception {
    public constructor(reason?: string, cause?: ExceptionLike);
    public constructor(cause?: ExceptionLike);
    public constructor(reasonOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
        super(
            typeof reasonOrCause === 'string' ?
                `Operation was aborted because ${reasonOrCause}` :
                'Operation was aborted',
            typeof reasonOrCause === 'string' || cause ?
                cause :
                reasonOrCause
        );
    }
}
