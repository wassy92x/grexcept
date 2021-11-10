import {Exception} from './Exception';

export class NotSupportedException extends Exception {
    public constructor(innerException?: Error);
    public constructor(message?: string, innerException?: Error);
    public constructor(messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof messageOrInnerException === 'string' ?
                messageOrInnerException :
                'Specified method or operation is not supported.',
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
    }
}
