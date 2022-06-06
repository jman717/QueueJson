
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* by_status.ts
*/

var queue = require("../app.ts");

//This json data can persist in a database or in a flat file

// https://prasanthmj.github.io/typescript/serialize-javascript-objects/

class class_test_by_matching_status {
    private id: number = 0
    private name: string = ''
    private status: string = 'init'
    private log: any
    constructor(props: any) {
        let t = this
        t.id = props.id
        t.log = props.log
        t.status = props.status
        t.name = props.name

        t.process = t.process.bind(t)
    }

    process(callback: any) {
        let t = this
        if (t.id == 300) {
            callback({ error: { msg: `this id(${t.id})} status(${t.status}) has some problem` } })
        } else
            callback({ success: { msg: `id = ${t.id} status(${t.status})` } })
    }

}

const sample_data_by_status = [
    { props: { id: 100, status: 'new', name: 'test' } },
    { props: { id: 200, status: 'print', name: 'another' } },
    { props: { id: 300, status: 'new', name: 'some name' } },
    { props: { id: 400, status: 'delete', name: 'last' } }
]

try {
    let qJson = new queue({
        class_obj: class_test_by_matching_status,
        appender: 'status',
        stats: true,
        debug: true
    }).init({ input_data: sample_data_by_status, matching: ['new', 'print'] })

    qJson.process({}).then((success: any) => {
        qJson.log(`by_status success: (${JSON.stringify(success)})`, 'success')
    }, (error: any) => {
        qJson.log(`by_status errors: (${JSON.stringify(error)})`, 'error')
    })
} catch (e) {
    console.log(`error running all.ts test`)
}

