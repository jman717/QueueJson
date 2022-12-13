
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* func_all.js
*/

var queue = require("../app.js");

class class_test_func_all {
    constructor(props) {
        let t = this
        t.id = props.id
        t.log = props.log
        t.name = props.name

        t.some_function = t.some_function.bind(t)
        t.another_function = t.another_function.bind(t)
    }

    some_function(callback) {
        let t = this
        // if (t.id == 44) {
        //     callback({ error: { msg: `this id(${t.id}) in the custom function 'some_function' has thrown an error` } })
        // } else
            callback({ success: { id: t.id, function_name: 'some_function' } })
    }

    another_function(callback) {
        let t = this
        callback({ success: { id: t.id } })
    }
}

const sample_data_func_all = [
    { props: { id: 22, name: 'test', function_name: 'some_function' } },
    { props: { id: 33, name: 'another', function_name: 'another_function' } },
    { props: { id: 44, name: 'some name', function_name: 'some_function' } },
    { props: { id: 45, name: 'last', function_name: 'some_function' } }
]

let qJson = new queue({
    class_obj: class_test_func_all,
    appender: 'func_all',
    stats: false,
    debug: true
}).init({ input_data: sample_data_func_all })

try {
    qJson.process({}).then((success) => {
        qJson.logMsg(`func_all success: (${JSON.stringify(success)})`, {"type": "success"})
    }, (error) => {
        qJson.logMsg(`func_all errors: (${JSON.stringify(error)})`, {"type": "error"})
    })
} catch (e) {
    qJson.logMsg(`error running func_all.js test`, {"type": "error"})
}

