import {Exception} from './Exception';

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
