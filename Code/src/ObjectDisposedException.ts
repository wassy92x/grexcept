import {InvalidOperationException} from './InvalidOperationException';

/**
 * Exception that will be thrown if an operation is invalid because the object is already disposed.
 */
export class ObjectDisposedException extends InvalidOperationException {
    private readonly _objectName: symbol;

    public constructor(objectName: string, cause?: Error);
    public constructor(objectName: string, message?: string, cause?: Error);
    public constructor(objectName: string, messageOrCause?: string | Error, cause?: Error) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Cannot access a disposed object.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
        this._objectName = Symbol('Object name');
        this.data[this._objectName] = objectName;
    }

    public get objectName(): string {
        return this.data[this._objectName];
    }
}
