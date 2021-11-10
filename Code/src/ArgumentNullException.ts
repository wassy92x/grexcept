import {ArgumentException} from './ArgumentException';

export class ArgumentNullException extends ArgumentException {
    public constructor(argumentName: string, message?: string, innerException?: Error);
    public constructor(argumentName: string, innerException?: Error);
    public constructor(argumentName: string, messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            argumentName,
            typeof messageOrInnerException === 'string' ?
                messageOrInnerException :
                'Value can not be null or undefined.',
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
    }
}
