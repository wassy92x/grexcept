import {Exception} from './Exception';

/**
 * Exception that will be thrown if the callee is not permitted to execute this method or operation.
 */
export class NotPermittedException extends Exception {
    public constructor(cause?: Error);
    public constructor(message?: string, cause?: Error);
    public constructor(messageOrCause?: string | Error, cause?: Error) {
        super(
            typeof messageOrCause === 'string' ?
                messageOrCause :
                'Callee is not permitted to execute this method or operation.',
            typeof messageOrCause === 'string' || cause ?
                cause :
                messageOrCause
        );
    }
}
