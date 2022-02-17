import {Exception} from './Exception';

/**
 * Exception that will be thrown if some resource or entity was not found.
 */
export class NotFoundException extends Exception {
    public readonly _entityType: symbol;

    public constructor(entity: string | (new (...args: any[]) => any), message?: string, innerException?: Error);
    public constructor(entity: string | (new (...args: any[]) => any), innerException?: Error);
    public constructor(entity: string | (new (...args: any[]) => any), messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof messageOrInnerException === 'string' ?
                messageOrInnerException :
                'Resource or entity not found.',
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
        this._entityType = Symbol('Entity type');
        this.data[this._entityType] = typeof entity === 'function' ? entity.name : entity;
    }

    public get entityType(): string {
        return this.data[this._entityType];
    }
}
