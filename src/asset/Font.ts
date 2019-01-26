import Asset from './Asset';

//Font
class Font extends Asset {
    public load(): Promise<void> {
        return null;
    };

    protected restore(): void {}
}

export default Font;
