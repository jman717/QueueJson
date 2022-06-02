
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* func_all.ts
*/

var queue = require("../app.ts");

//This json data can persist in a database or in a flat file

// https://prasanthmj.github.io/typescript/serialize-javascript-objects/

class class_test_func_all {
    private id: number = 0
    private name: string = ''
    private log: any
    constructor(props: any) {
        let t = this
        t.id = props.id
        t.log = props.log
        t.name = props.name

        t.some_function = t.some_function.bind(t)
    }

    some_function(callback: any) {
        let t = this
        if (t.id == 44) {
            callback({ error: { msg: `this id(${t.id}) in the custom function 'some_function' has thrown an error` } })
        } else
            callback({ success: { id: t.id, function_name: 'some_function' } })
    }

}

const sample_data_func_all = [
    { props: { id: 22, name: 'test' } },
    { props: { id: 33, name: 'another' } },
    { props: { id: 44, name: 'some name' } },
    { props: { id: 45, name: 'last' } }
]

try {
    let qJson = new queue({
        class_obj: class_test_func_all,
        function_name: 'some_function',
        appender: 'func_all',
        stats: true,
        debug: true
    }).init({ input_data: sample_data_func_all })

    qJson.process({}).then((success: any) => {
        qJson.log(`func_all success: (${JSON.stringify(success)})`, 'success')
    }, (error: any) => {
        qJson.log(`func_all errors: (${JSON.stringify(error)})`, 'error')
    })
} catch (e) {
    console.log(`error running func_all.ts test`)
}
