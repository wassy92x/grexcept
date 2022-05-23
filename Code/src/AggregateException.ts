import {Exception} from './Exception';

/**
 * Exception that will be thrown if multiple errors occurred.
 */
export class AggregateException extends Exception implements Iterable<Error> {
    public readonly innerExceptions: ReadonlyArray<Error>;

    public constructor(innerExceptions: Error | Error[], message?: string);
    public constructor(innerExceptions: Error | Error[]);
    public constructor(innerExceptions: Error | Error[], message?: string) {
        const exceptions = Array.isArray(innerExceptions) ? innerExceptions.slice() : [innerExceptions]
        const messages = exceptions.map((e: Error, i: number) => `#${i} ${e.message}`);
        super(message ?? `One or more errors occurred:\n${messages.join('\n')}`, exceptions[0]);
        this.innerExceptions = exceptions;
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