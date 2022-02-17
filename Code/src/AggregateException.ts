import {Exception} from './Exception';

/**
 * Exception that will be thrown if multiple errors occurred.
 */
export class AggregateException extends Exception implements Iterable<Error> {
    public readonly innerExceptions: ReadonlyArray<Error>;

    public constructor(innerException: Error | Error[], message?: string);
    public constructor(innerException: Error | Error[]);
    public constructor(innerException: Error | Error[], message?: string) {
        const innerExceptions = Array.isArray(innerException) ? innerException.slice() : [innerException]
        super(message ?? `One or more errors occurred.`, innerExceptions[0]);
        this.innerExceptions = innerExceptions;
    }

    public [Symbol.iterator](): Iterator<Error> {
        return this.innerExceptions[Symbol.iterator]();
    }

    public toArray(): Error[] {
        return this.innerExceptions.slice();
    }

    get stack(): string {
        const innerStacks = this.innerExceptions
            .map((ex: Error, i: number) => {
                const innerStack = ex.stack?.replace(/\n/g, '\n\t') ?? `${ex.name}: ${ex.message}`;
                return `---> (Inner Exception #${i}) ${innerStack}`;
            })
            .join('\n\n');

        return `${super.stack}\n${innerStacks}`;
    }
}