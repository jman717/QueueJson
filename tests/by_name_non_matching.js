
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* by_name.js
*/

var queue = require("../app.js");

class class_test_by_name {
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
            callback({ error: { msg: `this id(${t.id})} name(${t.name}) has some problem` } })
        } else
            callback({ success: { msg: `id = ${t.id} name(${t.name})` } })
    }

}

const sample_data_by_name = [
    { props: { id: 100, status: 'new', name: 'test' } },
    { props: { id: 200, status: 'print', name: 'another' } },
    { props: { id: 300, status: 'new', name: 'some name' } },
    { props: { id: 400, status: 'delete', name: 'last' } }
]
let qJson = new queue({
    class_obj: class_test_by_name,
    appender: 'name',
    stats: true,
    debug: true
}).init({ input_data: sample_data_by_name, non_matching: ['test', 'last'] })

try {
    qJson.process({}).then((success) => {
        qJson.logMsg(`by_name_non_matching success: (${JSON.stringify(success)})`, { "type": "success" })
    }, (error) => {
        qJson.logMsg(`by_name_non_matching errors: (${JSON.stringify(error)})`, { "type": "error" })
    })
} catch (e) {
    qJson.logMsg(`error running by_name_matching.js test`, { "type": "error" })
}

