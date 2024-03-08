export class Barrier {

    private _isOpen: boolean;
    private _promise: Promise<boolean>;
    private _completePromise!: (v: boolean) => void;

    constructor() {
        this._isOpen = false;
        this._promise = new Promise<boolean>((c, e) => {
            this._completePromise = c;
        });
    }

    isOpen(): boolean {
        return this._isOpen;
    }

    open(): void {
        this._isOpen = true;
        this._completePromise(true);
    }

    wait(): Promise<boolean> {
        return this._promise;
    }
}


const myBarrier = new Barrier();


function customFetch(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        resolve(`data: url:${url}`)
    });
}





customFetch('https://myapi/data').then(data => {
    return myBarrier.wait();
})


myBarrier.open();