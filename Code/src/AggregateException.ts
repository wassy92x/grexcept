import {Exception, ExceptionLike} from './Exception';

/**
 * Exception that will be thrown if multiple errors occurred.
 */
export class AggregateException extends Exception implements Iterable<ExceptionLike> {
    public readonly innerExceptions: ReadonlyArray<ExceptionLike>;

    public constructor(innerExceptions: ExceptionLike | ExceptionLike[], message?: string);
    public constructor(innerExceptions: ExceptionLike | ExceptionLike[]);
    public constructor(innerExceptions: ExceptionLike | ExceptionLike[], message?: string) {
        const exceptions = Array.isArray(innerExceptions) ? innerExceptions.slice() : [innerExceptions]
        const messages = exceptions.map((e: ExceptionLike, i: number) => `#${i} ${e.message}`);
        super(message ?? `One or more errors occurred:\n${messages.join('\n')}`, exceptions[0]);
        Object.defineProperty(this, 'innerExceptions', {
            ...Object.getOwnPropertyDescriptor(this, 'innerExceptions'),
            enumerable: false
        });
        this.innerExceptions = exceptions;
    }

    public [Symbol.iterator](): Iterator<ExceptionLike> {
        return this.innerExceptions[Symbol.iterator]();
    }

    public toArray(): ExceptionLike[] {
        return this.innerExceptions.slice();
    }

    protected _buildStacktrace(): string {
        const innerStacks = this.innerExceptions
            .map((ex: ExceptionLike, i: number) => {
                const innerStack = ex.stack?.replace(/\n/g, '\n\t') ?? `${ex.name}: ${ex.message}`;
                return `---> (Inner Exception #${i}) ${innerStack}`;
            })
            .join('\n\n');

        return `${super.stack}\n${innerStacks}`;
    }
}