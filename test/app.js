var assert = require('assert');

describe('app', function () {
    let app, application, props = {getParent: ()=>{}, debug: true}

    it('app.constructor should pass with parameters', function () {
        application = require('../app.js')
        assert(app = new application(props))
    })

    it('app.init is a function', function () {
        assert(typeof app.init == 'function')
    })

    it('app.process is a function', function () {
        assert(typeof app.process == 'function')
    })
    
    it('app.getParent is a function', function () {
        assert(typeof app.getParent == 'function')
    })

    it('app.logMsg is a function', function () {
        assert(typeof app.logMsg == 'function')
    })
})

describe('require', function () {
    
    it('queueobj', function () {
        assert(require('queueobj'))
    })
    
    it('chai', function () {
        assert(require('chai'))
    })
    
    it('mocha', function () {
        assert(require('mocha'))
    })

    it('node-console-colors', function () {
        assert(require('node-console-colors'))
    })
        
    it('ts-node', function () {
        assert(require('ts-node'))
    })
            
    it('diffler', function () {
        assert(require('diffler'))
    })
})
