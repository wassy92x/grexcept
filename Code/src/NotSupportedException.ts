import {Exception} from './Exception';

/**
 * Exception that will be thrown if the called method or operation is not supported.
 */
export class NotSupportedException extends Exception {
    public constructor(cause?: Error);
    public constructor(message?: string, cause?: Error);
    public constructor(messageOrCause?: string | Error, cause?: Error) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Specified method or operation is not supported.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}
