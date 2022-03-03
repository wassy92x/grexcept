import {Exception} from './Exception';

/**
 * Exception that will be thrown if an input or output error occurred.
 */
export class IOException extends Exception {
    public constructor(cause?: Error);
    public constructor(message?: string, cause?: Error);
    public constructor(messageOrCause?: string | Error, cause?: Error) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'I/O error occurred.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}
