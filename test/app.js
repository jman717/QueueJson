var assert = require('assert');

describe('app', function () {

    describe('require', function () {
        it('queueobj', function () {
            try {
                queueobj = require('queueobj')
                if (typeof queueobj == 'undefined') {
                    throw new Error('no queueobj')
                }
            } catch (e) {
                assert(false)
            }
        })
    })
    
    describe('node-console-colors', function () {
        it('node-console-colors', function () {
            try {
                ncc = require('node-console-colors')
                if (typeof ncc == 'undefined') {
                    throw new Error('no node-console-colors')
                }
            } catch (e) {
                assert(false)
            }
        })
    })
})
