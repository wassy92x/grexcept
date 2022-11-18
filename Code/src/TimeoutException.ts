import {OperationAbortedException} from './OperationAbortedException';
import {ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if some operation has timed out.
 */
export class TimeoutException extends OperationAbortedException {
    public readonly _timeout: symbol;

    public constructor(timeout: number, reason?: string, cause?: ExceptionLike);
    public constructor(timeout: number, cause?: ExceptionLike);
    public constructor(timeout: number, reasonOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
        super(
            typeof reasonOrCause === 'string' ?
                reasonOrCause :
                'Timeout has been reached.',
            typeof reasonOrCause === 'string' || cause ?
                cause :
                reasonOrCause
        );
        Object.defineProperty(this, '_timeout', {
            ...Object.getOwnPropertyDescriptor(this, '_timeout'),
            enumerable: false
        });
        this._timeout = Symbol('Timeout');
        this.data[this._timeout] = timeout;
    }

    public get timeout(): number {
        return this.data[this._timeout];
    }
}