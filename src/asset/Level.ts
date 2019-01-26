import Asset from './Asset';

//Json
class Level extends Asset {
    public load(): Promise<void> {
        return null;
    };

    protected restore(): void {}
}

export default Level;
