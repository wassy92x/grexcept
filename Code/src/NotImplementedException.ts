import {Exception} from './Exception';

/**
 * Exception that will be thrown if some method or operation is not implemented.
 */
export class NotImplementedException extends Exception {
    public constructor(cause?: Error);
    public constructor(message?: string, cause?: Error);
    public constructor(messageOrCause?: string | Error, cause?: Error) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'The method or operation is not implemented.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}