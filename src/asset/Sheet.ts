import Asset from './Asset';

//Image
class Sheet extends Asset {
    public load(): Promise<void> {
        return null;
    };

    protected restore(): void {}
}

export default Sheet;
