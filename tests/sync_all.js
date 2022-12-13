
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* sync_all.js
*/

var queue = require("../app.js");

class class_test_sync_all {
    constructor(props) {
        let t = this
        t.id = props.id
        t.log = props.log
        t.name = props.name

        t.some_function = t.some_function.bind(t)
        t.process = t.process.bind(t)
    }

    some_function(callback) {
        let t = this
        setTimeout(() => {
            callback({ success: { id: t.id, function_name: 'some_function' } })
        }, 3000)
    }

    process(callback) {
        let t = this
        callback({ success: { id: t.id } })
    }
}

const sample_data_sync_all = [
    { props: { id: 220, name: 'test', function_name: 'some_function' } },
    { props: { id: 330, name: 'another' } },
    { props: { id: 440, name: 'some name', function_name: 'some_function' } },
    { props: { id: 450, name: 'last' } }
]

let qJson = new queue({
    class_obj: class_test_sync_all,
    appender: 'sync_all',
    stats: true,
    debug: true
}).init({ input_data: sample_data_sync_all })

try {
    qJson.process({}).then((success) => {
        qJson.logMsg(`sync_all success: (${JSON.stringify(success)})`, { "type": "success" })
    }, (error) => {
        qJson.logMsg(`sync_all errors: (${JSON.stringify(error)})`, { "type": "error" })
    })
} catch (e) {
    qJson.logMsg(`error running sync_all.js test`, { "type": "error" })
}

