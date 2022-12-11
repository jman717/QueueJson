const assert = require('assert'),
    jsonHasDifferences = require('diffler'),
    packagejson = require('../package.json')

const packageMock = {
  "name": "queuejson",
  "version": "7.0.5",
  "description": "Process class objects according to json array input data.",
  "main": "app.ts",
  "dependencies": {
    "chai": "^4.3.7",
    "mocha": "^10.1.0",
    "node-console-colors": "^1.1.4",
    "queueobj": "^10.0.0",
    "ts-node": "^10.9.1",
    "diffler": "^2.0.4"
  },
  "scripts": {
    "start": "npx ts-node app.ts",
    "test_all": "npx ts-node ./tests/all.ts",
    "test_top_one": "npx ts-node ./tests/top_one.ts",
    "test_bottom_one": "npx ts-node ./tests/bottom_one.ts",
    "test_func_all": "npx ts-node ./tests/func_all.ts",
    "test_sync_all": "npx ts-node ./tests/sync_all.ts",
    "test_by_status_matching": "npx ts-node ./tests/by_status_matching.ts",
    "test_by_status_non_matching": "npx ts-node ./tests/by_status_non_matching.ts",
    "test_by_version_matching": "npx ts-node ./tests/by_version_matching.ts",
    "test_by_version_non_matching": "npx ts-node ./tests/by_version_non_matching.ts",
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
