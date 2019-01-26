import Asset from './Asset';

//Json
class Prefab extends Asset {
    public load(): Promise<void> {
        return null;
    };

    protected restore(): void {}
}

export default Prefab;
