import Asset from './Asset';

//Audio
class Sound extends Asset {
    public load(): Promise<void> {
        return null;
    };

    protected restore(): void {}
}

export default Sound;
