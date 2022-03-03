import {Exception} from './Exception';

/**
 * Exception that will be thrown if some resource or entity was not found.
 */
export class NotFoundException extends Exception {
    public readonly _entityType: symbol;

    public constructor(entity: string | (new (...args: any[]) => any), message?: string, cause?: Error);
    public constructor(entity: string | (new (...args: any[]) => any), cause?: Error);
    public constructor(entity: string | (new (...args: any[]) => any), messageOrCause?: string | Error, cause?: Error) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Resource or entity not found.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
        this._entityType = Symbol('Entity type');
        this.data[this._entityType] = typeof entity === 'function' ? entity.name : entity;
    }

    public get entityType(): string {
        return this.data[this._entityType];
    }
}
