const path = require('path')

const app = path.join(process.cwd(), '/src/index.js')
console.log('this.app',app)
module.exports = {
    main: app
}