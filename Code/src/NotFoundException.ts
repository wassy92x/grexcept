import {Exception, ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if some resource or entity was not found.
 */
export class NotFoundException extends Exception {
    public readonly _entityType: symbol;

    public constructor(entity: string | (new (...args: any[]) => any), message?: string, cause?: ExceptionLike);
    public constructor(entity: string | (new (...args: any[]) => any), cause?: ExceptionLike);
    public constructor(entity: string | (new (...args: any[]) => any), messageOrCause?: string | ExceptionLike, cause?: ExceptionLike) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Resource or entity not found.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
        Object.defineProperty(this, '_entityType', {
            ...Object.getOwnPropertyDescriptor(this, '_entityType'),
            enumerable: false
        });
        this._entityType = Symbol('Entity type');
        this.data[this._entityType] = typeof entity === 'function' ? entity.name : entity;
    }

    public get entityType(): string {
        return this.data[this._entityType];
    }
}
