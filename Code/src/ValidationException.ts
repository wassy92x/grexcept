import {ArgumentException} from "./ArgumentException";

export class ValidationException extends ArgumentException {
    public constructor(argumentName: string, message?: string, innerException?: Error);
    public constructor(argumentName: string, innerException?: Error);
    public constructor(argumentName: string, messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            argumentName,
            typeof messageOrInnerException === 'string' ?
                messageOrInnerException :
                'Validation failed.',
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
    }
}