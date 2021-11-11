import {Exception} from './Exception';

/**
 * Exception that will be thrown if the callee is not permitted to execute this method or operation.
 */
export class NotPermittedException extends Exception {
    public constructor(innerException?: Error);
    public constructor(message?: string, innerException?: Error);
    public constructor(messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof messageOrInnerException === 'string' ?
                messageOrInnerException :
                'Callee is not permitted to execute this method or operation.',
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
    }
}
