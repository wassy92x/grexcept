import {OperationAbortedException} from './OperationAbortedException';

/**
 * Exception that will be thrown if some operation has timed out.
 */
export class TimeoutException extends OperationAbortedException {
    public readonly timeout: number;

    public constructor(timeout: number, reason?: string, innerException?: Error);
    public constructor(timeout: number, innerException?: Error);
    public constructor(timeout: number, reasonOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof reasonOrInnerException === 'string' ?
                `${reasonOrInnerException}\nTimeout: '${timeout}'` :
                `timeout has been reached.\nTimeout: '${timeout}'`,
            typeof reasonOrInnerException === 'string' || innerException ?
                innerException :
                reasonOrInnerException
        );
        this.timeout = timeout;
    }
}