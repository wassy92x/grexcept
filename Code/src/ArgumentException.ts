import {Exception} from './Exception';

export class ArgumentException extends Exception {
    public readonly argumentName: string;

    public constructor(argumentName: string, message?: string, innerException?: Error);
    public constructor(argumentName: string, innerException?: Error);
    public constructor(argumentName: string, messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof messageOrInnerException === 'string' ?
                `${messageOrInnerException}\nArgument name: '${argumentName}'` :
                `Value is invalid.\nArgument name: '${argumentName}'`,
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
        this.argumentName = argumentName;
    }
}
