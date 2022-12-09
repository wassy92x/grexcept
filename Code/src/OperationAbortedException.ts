import {Exception} from './Exception';

/**
 * Exception that will be thrown if an operation get's aborted for some reason. For example a timeout has been reached.
 */
export class OperationAbortedException extends Exception {
    public constructor(reason?: string, cause?: Error);
    public constructor(cause?: Error);
    public constructor(reasonOrCause?: string | Error, cause?: Error) {
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
