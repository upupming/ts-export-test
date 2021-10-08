declare class Lifecycle {
    x: string;
    constructor();
}
declare class PicGo {
    x: string;
    static PicGo: typeof PicGo;
    static Lifecycle: typeof Lifecycle;
    static default: typeof PicGo;
    constructor();
}
export = PicGo;
declare namespace PicGo {
    type PicGo = typeof PicGo;
    type Lifecycle = typeof Lifecycle;
}
