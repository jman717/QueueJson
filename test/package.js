const assert = require('assert'),
    jsonHasDifferences = require('diffler'),
    packagejson = require('../package.json')

const packageMock = {
  "name": "queuejson",
  "version": "10.0.0",
  "description": "Process class objects according to json array input data.",
  "main": "app.js",
  "dependencies": {
    "chai": "^4.3.7",
    "mocha": "^10.1.0",
    "node-console-colors": "^1.1.4",
    "queueobj": "^12.0.5",
    "ts-node": "^10.9.1",
    "diffler": "^2.0.4"
  },
  "scripts": {
    "start": "node app.js",
    "test_all": "node ./tests/all.js",
    "test_top_one": "node ./tests/top_one.js",
    "test_bottom_one": "node ./tests/bottom_one.js",
    "test_func_all": "node ./tests/func_all.js",
    "test_sync_all": "node ./tests/sync_all.js",
    "test_by_name_matching": "node ./tests/by_name_matching.js",
    "test_by_name_non_matching": "node ./tests/by_name_non_matching.js",
    "test_by_status_matching": "node ./tests/by_status_matching.js",
    "test_by_status_non_matching": "node ./tests/by_status_non_matching.js",
    "test_by_version_matching": "node ./tests/by_version_matching.js",
    "test_by_version_non_matching": "node ./tests/by_version_non_matching.js",
    "test": "mocha",
    "ditched": "ditched -a"
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
    "synchronous",
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
    "typescript": "^4.9.4"
  }
}

describe('package.json', function () {
  it('should pass', function () {
    const difference = jsonHasDifferences(packagejson, packageMock)
    assert(JSON.stringify(difference) == "{}")
  })

  it('should fail', function () {
      packageMock.version = '0'
      assert(jsonHasDifferences(packagejson, packageMock))
  })
})
