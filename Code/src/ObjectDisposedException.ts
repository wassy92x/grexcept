import {InvalidOperationException} from './InvalidOperationException';
import {ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if an operation is invalid because the object is already disposed.
 */
export class ObjectDisposedException extends InvalidOperationException {
    private readonly _objectName: symbol;

    public constructor(objectName: string, cause?: ExceptionLike);
    public constructor(objectName: string, message?: string, cause?: ExceptionLike);
    public constructor(objectName: string, messageOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Cannot access a disposed object.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
        Object.defineProperty(this, '_objectName', {
            ...Object.getOwnPropertyDescriptor(this, '_objectName'),
            enumerable: false
        });
        this._objectName = Symbol('Object name');
        this.data[this._objectName] = objectName;
    }

    public get objectName(): string {
        return this.data[this._objectName];
    }
}
