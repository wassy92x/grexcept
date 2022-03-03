import {Exception} from './Exception';

/**
 * Exception that will be thrown if an object or string doesn't fulfill the excepted format.
 */
export class InvalidFormatException extends Exception {
    public constructor(message?: string, cause?: Error);
    public constructor(cause?: Error);
    public constructor(messageOrCause?: string | Error, cause?: Error) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Format is invalid.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}