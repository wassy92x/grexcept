import {OperationAbortedException} from './OperationAbortedException';

/**
 * Exception that will be thrown if some operation has timed out.
 */
export class TimeoutException extends OperationAbortedException {
    public readonly _timeout: symbol;

    public constructor(timeout: number, reason?: string, innerException?: Error);
    public constructor(timeout: number, innerException?: Error);
    public constructor(timeout: number, reasonOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof reasonOrInnerException === 'string' ?
                reasonOrInnerException :
                'Timeout has been reached.',
            typeof reasonOrInnerException === 'string' || innerException ?
                innerException :
                reasonOrInnerException
        );
        this._timeout = Symbol('Timeout');
    }

    public get timeout(): number {
        return this.data[this._timeout];
    }
}