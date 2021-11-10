import {ArgumentException} from "./ArgumentException";

export class InvalidFormatException extends ArgumentException {
    public constructor(argumentName: string, message?: string, innerException?: Error);
    public constructor(argumentName: string, innerException?: Error);
    public constructor(argumentName: string, messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            argumentName,
            typeof messageOrInnerException === 'string' ?
                messageOrInnerException :
                'Format is invalid.',
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
    }
}