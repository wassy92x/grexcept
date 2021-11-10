import {Exception} from './Exception';

export class IOException extends Exception {
    public constructor(innerException?: Error);
    public constructor(message?: string, innerException?: Error);
    public constructor(messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof messageOrInnerException === 'string' ?
                messageOrInnerException :
                'I/O error occurred.',
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
    }
}
