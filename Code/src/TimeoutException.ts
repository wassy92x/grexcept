import {OperationAbortedException} from './OperationAbortedException';

/**
 * Exception that will be thrown if some operation has timed out.
 */
export class TimeoutException extends OperationAbortedException {
    public readonly _timeout: symbol;

    public constructor(timeout: number, reason?: string, cause?: Error);
    public constructor(timeout: number, cause?: Error);
    public constructor(timeout: number, reasonOrCause?: string | Error, cause?: Error) {
        super(
            typeof reasonOrCause === 'string' ?
                reasonOrCause :
                'Timeout has been reached.',
            typeof reasonOrCause === 'string' || cause ?
                cause :
                reasonOrCause
        );
        this._timeout = Symbol('Timeout');
    }

    public get timeout(): number {
        return this.data[this._timeout];
    }
}