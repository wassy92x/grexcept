import {Exception} from './Exception';

/**
 * Exception that will be thrown if a validation of some argument failed.
 */
export class ValidationException extends Exception {
    public constructor(message?: string, cause?: Error);
    public constructor(cause?: Error);
    public constructor(messageOrCause?: string | Error, cause?: Error) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Validation failed.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}