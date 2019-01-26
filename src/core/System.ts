export default class System {
    public get version(): string {
        return 'ennj 1.3.0a';
    }

    public get language(): string {
        return window.navigator.language;
    }

    public get touchSupport(): boolean {
        return window.navigator.maxTouchPoints > 0;
    }

    public get agent(): string {
        return window.navigator.userAgent;
    }
}
