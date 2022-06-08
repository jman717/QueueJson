
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* sync_all.ts
*/

var queue = require("../app.ts");

class class_test_sync_all {
    private id: number = 0
    private name: string = ''
    private log: any
    constructor(props: any) {
        let t = this
        t.id = props.id
        t.log = props.log
        t.name = props.name

        t.some_function = t.some_function.bind(t)
        t.process = t.process.bind(t)
    }

    some_function(callback: any) {
        let t = this
        setTimeout(()=>{
            callback({ success: { id: t.id, function_name: 'some_function' } })
        }, 3000)
    }

    process(callback: any) {
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

try {
    let qJson = new queue({
        class_obj: class_test_sync_all,
        appender: 'sync_all',
        stats: true,
        debug: true
    }).init({ input_data: sample_data_sync_all })

    qJson.process({}).then((success: any) => {
        qJson.log(`sync_all success: (${JSON.stringify(success)})`, 'success')
    }, (error: any) => {
        qJson.log(`sync_all errors: (${JSON.stringify(error)})`, 'error')
    })
} catch (e) {
    console.log(`error running sync_all.ts test`)
}

