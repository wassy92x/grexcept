import {Exception} from './Exception';

/**
 * Exception that will be thrown if a call of a method is invalid because of the current state of the object.
 */
export class InvalidOperationException extends Exception {
    public constructor(innerException?: Error);
    public constructor(message?: string, innerException?: Error);
    public constructor(messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof messageOrInnerException === 'string' ?
                messageOrInnerException :
                'Operation is not valid due to the current state of the object.',
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
    }
}
