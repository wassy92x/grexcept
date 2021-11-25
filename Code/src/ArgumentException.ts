import {Exception} from './Exception';

/**
 * Exception that will be thrown if a value is invalid.
 */
export class ArgumentException extends Exception {
    public readonly argumentName: PropertyKey;

    public constructor(argumentName: PropertyKey, message?: string, innerException?: Error);
    public constructor(argumentName: PropertyKey, innerException?: Error);
    public constructor(argumentName: PropertyKey, messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof messageOrInnerException === 'string' ?
                `${messageOrInnerException}\nArgument name: '${argumentName.toString()}'` :
                `Value is invalid.\nArgument name: '${argumentName.toString()}'`,
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
        this.argumentName = argumentName;
    }
}
