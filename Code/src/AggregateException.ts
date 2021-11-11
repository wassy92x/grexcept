import {Exception} from "./Exception";

/**
 * Exception that will be thrown if multiple errors occurred.
 */
export class AggregateException extends Exception implements Iterable<Error> {
    public readonly innerExceptions: ReadonlyArray<Error>;

    public constructor(innerException: Error | Error[], message?: string);
    public constructor(innerException: Error | Error[]);
    public constructor(innerException: Error | Error[], message?: string) {
        const innerExceptions = Array.isArray(innerException) ? innerException.slice() : [innerException];
        const innerMessages = innerExceptions
            .map((ex: Error, i: number) => `---> (Inner Exception #${i}) ${ex.name}: ${ex.message}`)
            .join('\n\n');

        super(message ? `${message}\n${innerMessages}` : `One or more errors occurred.\n${innerMessages}`);
        this.innerExceptions = innerExceptions;
    }

    public [Symbol.iterator](): Iterator<Error> {
        return this.innerExceptions[Symbol.iterator]();
    }

    public toArray(): Error[] {
        return this.innerExceptions.slice();
    }
}