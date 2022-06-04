# QueueJson

Process class objects according to json array input data.

Included tag appenders:

* all - asynchronous - process class object per json input array.
* top_one - asynchronous - process class object per the first entry in a json input array.
* bottom_one - asynchronous - process class object per the last entry in a json input array.
* func_all - asynchronous - process custom functions of custom class objects per json input array.
* sync_all - synchronous - process custom functions of custom class objects per json input array.

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
npm run test_top_one
npm run test_bottom_one
npm run test_func_all
npm run test_sync_all

```

Usage
---------
```js


var queue = require("queuejson");

class class_test {
    private id: number = 0
    private name: string = ''
    private log: any
    constructor(props: any) {
        let t = this
        t.id = props.id
        t.log = props.log
        t.name = props.name

        t.process = t.process.bind(t)
    }

    process(callback: any) {
        let t = this
        if (t.id == 3) {
            callback({ error: { msg: `this id(${t.id}) has some problem` } })
        } else
            callback({ success: { id: t.id } })
    }

}

const sample_data = [
    { props: { id: 1, name: 'test' } },
    { props: { id: 2, name: 'another' } },
    { props: { id: 3, name: 'some name' } },
    { props: { id: 4, name: 'name x' } }
]

try {
    let qJson = new queue({
        class_obj: class_test,
        appender: 'all',
        stats: true,
        debug: true
    }).init({ input_data: sample_data })

    qJson.process({}).then((success: any) => {
        qJson.log(`all success: (${JSON.stringify(success)})`, 'success')
    }, (error: any) => {
        qJson.log(`all errors: (${JSON.stringify(error)})`, 'error')
    })
} catch (e) {
    console.log(`error running all.ts test`)
}



```
