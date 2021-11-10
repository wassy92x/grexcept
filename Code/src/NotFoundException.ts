import {Exception} from './Exception';

export class NotFoundException extends Exception {
    public readonly entityName: string;

    public constructor(entity: string | (new () => any), message?: string, innerException?: Error);
    public constructor(entity: string | (new () => any), innerException?: Error);
    public constructor(entity: string | (new () => any), messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof messageOrInnerException === 'string' ?
                `${messageOrInnerException}\nEntity name: '${entity}'` :
                `Resource or entity not found.\nEntity name: '${entity}'`,
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
        this.entityName = typeof entity === 'function' ? entity.name : entity;
    }
}
