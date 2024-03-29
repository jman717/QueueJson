
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* by_status.js
*/

var queue = require("../app.js");

class class_test_by_non_matching_status {
    constructor(props) {
        let t = this
        t.id = props.id
        t.log = props.log
        t.status = props.status
        t.name = props.name
        t.status = 'init'

        t.process = t.process.bind(t)
    }

    process(callback) {
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

let qJson = new queue({
    class_obj: class_test_by_non_matching_status,
    appender: 'status',
    stats: true,
    debug: true
}).init({ input_data: sample_data_by_status, non_matching: ['new'] })

try {
    qJson.process({}).then((success) => {
        qJson.logMsg(`by_status success: (${JSON.stringify(success)})`, { "type": "success" })
    }, (error) => {
        qJson.logMsg(`by_status errors: (${JSON.stringify(error)})`, { "type": "error" })
    })
} catch (e) {
    qJson.logMsg(`error running by_status_non_matching.js test`, { "type": "error" })
}

