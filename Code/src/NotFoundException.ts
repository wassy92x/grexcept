import {Exception} from './Exception';

/**
 * Exception that will be thrown if some resource or entity was not found.
 */
export class NotFoundException extends Exception {
    public readonly entityName: string;

    public constructor(entity: string | (new (...args: any[]) => any), message?: string, innerException?: Error);
    public constructor(entity: string | (new (...args: any[]) => any), innerException?: Error);
    public constructor(entity: string | (new (...args: any[]) => any), messageOrInnerException?: string | Error, innerException?: Error) {
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
