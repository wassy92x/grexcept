import {Exception} from './Exception';

/**
 * Exception that will be thrown if multiple errors occurred.
 */
export class AggregateException extends Exception implements Iterable<Error> {
    public readonly causes: ReadonlyArray<Error>;

    public constructor(cause: Error | Error[], message?: string);
    public constructor(cause: Error | Error[]);
    public constructor(cause: Error | Error[], message?: string) {
        const causes = Array.isArray(cause) ? cause.slice() : [cause]
        super(message ?? `One or more errors occurred.`, causes[0]);
        this.causes = causes;
    }

    public [Symbol.iterator](): Iterator<Error> {
        return this.causes[Symbol.iterator]();
    }

    public toArray(): Error[] {
        return this.causes.slice();
    }

    get stack(): string {
        const innerStacks = this.causes
            .map((ex: Error, i: number) => {
                const innerStack = ex.stack?.replace(/\n/g, '\n\t') ?? `${ex.name}: ${ex.message}`;
                return `---> (Inner Exception #${i}) ${innerStack}`;
            })
            .join('\n\n');

        return `${super.stack}\n${innerStacks}`;
    }
}