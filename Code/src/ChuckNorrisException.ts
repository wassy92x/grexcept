import {Exception} from "./Exception";

export class ChuckNorrisException extends Exception {
    public readonly exceptionObject: any;

    public constructor(exceptionObject: any) {
        super(`An error occurred.\nException object: ${exceptionObject}`);
        this.exceptionObject = exceptionObject;
    }
}