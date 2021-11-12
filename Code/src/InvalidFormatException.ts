import {Exception} from './Exception';

/**
 * Exception that will be thrown if an object or string doesn't fulfill the excepted format.
 */
export class InvalidFormatException extends Exception {
    public constructor(message?: string, innerException?: Error);
    public constructor(innerException?: Error);
    public constructor(messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof messageOrInnerException === 'string' ?
                messageOrInnerException :
                'Format is invalid.',
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
    }
}