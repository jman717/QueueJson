
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* bottom_one.js
*/

var queue = require("../app.js");

class class_test_bottom_one {
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

const sample_data_bottom_one = [
    { props: { id: 100, name: 'test' } },
    { props: { id: 200, name: 'another' } },
    { props: { id: 300, name: 'some name' } },
    { props: { id: 400, name: 'last' } }
]

try {
    let qJson = new queue({
        class_obj: class_test_bottom_one,
        appender: 'bottom_one',
        stats: true,
        debug: true
    }).init({ input_data: sample_data_bottom_one })

    qJson.process({}).then((success) => {
        qJson.log(`all success: (${JSON.stringify(success)})`, 'success')
    }, (error) => {
        qJson.log(`all errors: (${JSON.stringify(error)})`, 'error')
    })
} catch (e) {
    console.log(`error running all.ts test`)
}

