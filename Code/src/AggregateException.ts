import {Exception} from './Exception';

/**
 * Exception that will be thrown if multiple errors occurred.
 */
export class AggregateException extends Exception implements Iterable<Error> {
    public readonly innerExceptions: ReadonlyArray<Error>;

    public constructor(innerExceptions: Error | ReadonlyArray<Error>, message?: string);
    public constructor(innerExceptions: Error | ReadonlyArray<Error>);
    public constructor(innerExceptions: Error | ReadonlyArray<Error>, message?: string) {
        const exceptions = Array.isArray(innerExceptions) ? innerExceptions.slice() : [innerExceptions]
        const messages = exceptions.map((e: Error, i: number) => `#${i} ${e.message}`);
        super(message ?? `One or more errors occurred:\n${messages.join('\n')}`, exceptions[0]);
        Object.defineProperty(this, 'innerExceptions', {
            ...Object.getOwnPropertyDescriptor(this, 'innerExceptions'),
            enumerable: false
        });
        this.innerExceptions = exceptions;
    }

    public [Symbol.iterator](): Iterator<Error> {
        return this.innerExceptions[Symbol.iterator]();
    }

    public toArray(): Error[] {
        return this.innerExceptions.slice();
    }

    public toJSON(maxDepth = 4): object | string {
        const json: any = super.toJSON(maxDepth);
        json.innerExceptions = this.innerExceptions.map((ex: Error) => Exception._toJSON(ex, WeakSet ? new WeakSet() : new Set(), 2, maxDepth))
        return json;
    }

    protected _buildStacktrace(): string {
        const innerStacks = this.innerExceptions
            .map((ex: Error, i: number) => {
                const innerStack = ex.stack?.replace(/\n/g, '\n\t') ?? `${ex.name}: ${ex.message}`;
                return `---> (Inner Exception #${i}) ${innerStack}`;
            })
            .join('\n\n');

        return `${super._buildStacktrace()}\n${innerStacks}`;
    }
}