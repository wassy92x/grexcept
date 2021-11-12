import {Exception} from './Exception';

/**
 * Exception that will be thrown if a plain object is thrown somewhere else.
 */
export class ChuckNorrisException extends Exception {
    public readonly exceptionObject: any;

    public constructor(exceptionObject: any) {
        super(`An error occurred.\nException object: ${exceptionObject}`);
        this.exceptionObject = exceptionObject;
    }
}