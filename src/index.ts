class Lifecycle {
    x: string
    constructor() {
        this.x = 'hello Lifecycle'
    }
}

class PicGo {
    x: string
    static PicGo = PicGo

    static Lifecycle = Lifecycle
    static default = PicGo
    constructor() {
        this.x = 'hello PicGo'
    }
}


export = PicGo

declare namespace PicGo {
    type PicGo = typeof PicGo
    type Lifecycle = typeof Lifecycle
}
