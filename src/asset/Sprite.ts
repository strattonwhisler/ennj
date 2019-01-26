import Asset from './Asset';

//Image
class Sprite extends Asset {
    private data: HTMLImageElement;

    constructor(url: string) {
        super(url);
    }

    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = this.url;
            image.addEventListener('load', () => {
                this.loaded = true;
                this.data = image;
                this.store(this.data);
                resolve();
            });
            image.addEventListener('error', (err) => {
                reject(err);
            });
        });
    };

    protected restore(): void {
        this.data = this.retrieve() as HTMLImageElement;
    }
}

export default Sprite;
