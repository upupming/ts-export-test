# Export test

## Motivation

support both:

```js
const { PicGo } = require('picgo')
const PicGo = require('picgo')
```

The main idea is from the export method of `co`: https://github.com/tj/co/blob/master/index.js#L12. The only difference is that `co` is pure JS, but we have to support typescript import, too. So we have to declare correct type definitions.

See discuss here: https://github.com/PicGo/PicGo-Core/pull/102

## Implementation

```ts
class Lifecycle {
    x: string
    constructor() {
        this.x = 'hello Lifecycle'
    }
}

class PicGo {
    x: string
    // This is actually how we make the following member import works:
    // const { PicGo } = require('picgo')
    static PicGo = PicGo
    static Lifecycle = Lifecycle
    static default = PicGo
    constructor() {
        this.x = 'hello PicGo'
    }
}


export = PicGo

// This is a hack to cheat TS think we have do some think like:
/*
export {
    PicGo,
    Lifecycle
}
*/
declare namespace PicGo {
    type PicGo = typeof PicGo
    type Lifecycle = typeof Lifecycle
}

```

Compiled CJS:

```js
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/index.ts
var Lifecycle = class {
  x;
  constructor() {
    this.x = "hello Lifecycle";
  }
};
var _PicGo = class {
  x;
  constructor() {
    this.x = "hello PicGo";
  }
};
var PicGo = _PicGo;
__publicField(PicGo, "PicGo", _PicGo);
__publicField(PicGo, "Lifecycle", Lifecycle);
__publicField(PicGo, "default", _PicGo);
module.exports = PicGo;


```

Compiled .d.ts:

```ts
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

```

Use in TS:

```ts
import PicGo0 = require('.')

console.log(new PicGo0().x)

import { PicGo as PicGo1 } from '.'
console.log(new PicGo1().x)

import PicGo2 from '.'
console.log(new PicGo2().x)

```

Use in JS:

```js
const PicGo0 = require('.')

console.log(new PicGo0().x)

const { PicGo: PicGo1 } = require('.')
console.log(new PicGo1().x)

const PicGo2 = require('.').default
console.log(new PicGo2().x)

```

## Conclusion

If we are migrating from TS CJS style `export = SomeClass` to ESM style `export { SomeClass }`, this method can be a middle-state that support both import style, and user can choose to change to the better `import { SomeClass }`.
