const path = require('path')

const app = path.join(process.cwd(), '/src/index.js')
// const app=path.join(process.cwd(),'/vueSrc/index.js');
console.log('this.app',app)
module.exports = {
    main: app
}