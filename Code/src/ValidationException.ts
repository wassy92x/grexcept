import {Exception} from './Exception';

/**
 * Exception that will be thrown if a validation of some argument failed.
 */
export class ValidationException extends Exception {
    public constructor(message?: string, innerException?: Error);
    public constructor(innerException?: Error);
    public constructor(messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof messageOrInnerException === 'string' ?
                messageOrInnerException :
                'Validation failed.',
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
    }
}