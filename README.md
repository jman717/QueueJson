# QueueJson

Import and Export Json Data In Conjunction With QueueObj.

Included tag appenders:

* all - asynchronous - process all added objects.
* func_all - asynchronous - process custom functions to added objects.
* top_one - asynchronous - process only the object in the 0(zero) position of the process array.
* bottom_one - asynchronous - process only the object in the last position of the process array.
* sync_all - synchronous - queue and process all objects by items as well as custom functions.
* status - synchronous - queue and process all objects by status.
* version - synchronous - queue and process all objects by version.

Installation
---------
```
npm install QueueJson 
```

Mocha Test
---------
```
npm test
```

General Setup Test
---------
```
npm run test_all


<!-- node test_top_one
node test_bottom_one
node test_func_all
node test_sync_all
node test_status
node test_version -->

```

Usage
---------
```js



```
