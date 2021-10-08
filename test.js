const PicGo0 = require('.')

console.log(new PicGo0().x)

const { PicGo: PicGo1, Lifecycle } = require('.')
console.log(new PicGo1().x)
console.log(new Lifecycle().x)

const PicGo2 = require('.').default
console.log(new PicGo2().x)
