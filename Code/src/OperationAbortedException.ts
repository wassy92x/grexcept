import {Exception} from './Exception';

/**
 * Exception that will be thrown if an operation get's aborted for some reason. For example a timeout has been reached.
 */
export class OperationAbortedException extends Exception {
    public constructor(reason?: string, innerException?: Error);
    public constructor(innerException?: Error);
    public constructor(reasonOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof reasonOrInnerException === 'string' ?
                `Operation was aborted because ${reasonOrInnerException}` :
                'Operation was aborted',
            typeof reasonOrInnerException === 'string' || innerException ?
                innerException :
                reasonOrInnerException
        );
    }
}
