import {Exception} from "./Exception";

export class TimeoutException extends Exception {
    public readonly timeout: number;

    public constructor(timeout: number, message?: string, innerException?: Error);
    public constructor(timeout: number, innerException?: Error);
    public constructor(timeout: number, messageOrInnerException?: string | Error, innerException?: Error) {
        super(
            typeof messageOrInnerException === 'string' ?
                `${messageOrInnerException}\nTimeout: '${timeout}'` :
                `Operation timed out.\nTimeout: '${timeout}'`,
            typeof messageOrInnerException === 'string' || innerException ?
                innerException :
                messageOrInnerException
        );
        this.timeout = timeout;
    }
}