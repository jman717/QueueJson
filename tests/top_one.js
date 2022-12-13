
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* top_one.js
*/

var queue = require("../app.js");

class class_test_top_one {
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
            callback({ success: { id: t.id } })
    }

}

const sample_data_top_one = [
    { props: { id: 100, name: 'test' } },
    { props: { id: 200, name: 'another' } },
    { props: { id: 300, name: 'some name' } },
    { props: { id: 400, name: 'last' } }
]

let qJson = new queue({
    class_obj: class_test_top_one,
    appender: 'top_one',
    stats: true,
    debug: true
}).init({ input_data: sample_data_top_one })

try {
    qJson.process({}).then((success) => {
        qJson.logMsg(`all success: (${JSON.stringify(success)})`, { "type": "success" })
    }, (error) => {
        qJson.logMsg(`all errors: (${JSON.stringify(error)})`, { "type": "error" })
    })
} catch (e) {
    qJson.logMsg(`error running top_one.js test`, { "type": "error" })
}

