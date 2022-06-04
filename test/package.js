const assert = require('assert'),
    jsonHasDifferences = require('compare-json-difference'),
    packagejson = require('../package.json')

const packageMock = {
  "name": "queuejson",
  "version": "5.0.0",
  "description": "Process class objects according to json array input data.",
  "main": "app.ts",
  "dependencies": {
    "chai": "^4.3.3",
    "compare-json-difference": "^0.1.3",
    "mocha": "^9.1.3",
    "node-console-colors": "^1.1.4",
    "queueobj": "^9.0.0",
    "ts-node": "^10.8.0"
  },
  "scripts": {
    "start": "npx ts-node app.ts",
    "test_all": "npx ts-node ./tests/all.ts",
    "test_top_one": "npx ts-node ./tests/top_one.ts",
    "test_bottom_one": "npx ts-node ./tests/bottom_one.ts",
    "test_func_all": "npx ts-node ./tests/func_all.ts",
    "test_sync_all": "npx ts-node ./tests/sync_all.ts",
    "test": "mocha"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/jman717/QueueJson.git"
  },
  "keywords": [
    "queueobj",
    "json",
    "persist",
    "queue",
    "processing",
    "appenders",
    "javascript",
    "asynchronous",
    "synchronous",
    "await",
    "typescript",
    "objects",
    "promises",
    "mocha"
  ],
  "author": "Jim Manton",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/jman717/QueueJson/issues"
  },
  "homepage": "https://github.com/jman717/QueueJson#readme",
  "devDependencies": {
    "typescript": "^4.6.4"
  }
}

describe('package.json', function () {
    it('should pass', function () {
        assert(!jsonHasDifferences(packagejson, packageMock, true))
    })

    it('should fail', function () {
        packageMock.version = '0'
        assert(jsonHasDifferences(packagejson, packageMock, true))
    })
})
