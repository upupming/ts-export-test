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
