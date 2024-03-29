
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* all.js
*/

var queue = require("../app.js");

class class_test_all {
    constructor(props) {
        let t = this
        t.id = props.id
        t.log = props.log
        t.name = props.name

        t.process = t.process.bind(t)
    }

    process(callback) {
        let t = this
        if (t.id == 3) {
            callback({ error: { msg: `this id(${t.id}) has some problem` } })
        } else
            callback({ success: { msg: `id = ${t.id}` } })
    }

}

const sample_data_all = [
    { props: { id: 1, name: 'test' } },
    { props: { id: 2, name: 'another' } },
    { props: { id: 3, name: 'numb 3' } },
    { props: { id: 4, name: 'numb 4' } }
]

let qJson = new queue({
    class_obj: class_test_all,
    appender: 'all',
    stats: true,
    debug: true
}).init({ input_data: sample_data_all })

try {
    qJson.process({}).then((success) => {
        qJson.logMsg(`all success: (${JSON.stringify(success)})`, { "type": "success" })
    }, (error) => {
        qJson.logMsg(`all errors: (${JSON.stringify(error)})`, { "type": "error" })
    })
} catch (e) {
    qJson.logMsg(`error running all.js test`, { "type": "error" })
}

