
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* version.js
*/

var queue = require("../app.js");

class class_test_by_non_matching_version {
    constructor(props) {
        let t = this
        t.id = props.id
        t.log = props.log
        t.version = props.version
        t.name = props.name

        t.process = t.process.bind(t)
    }

    process(callback) {
        let t = this
        if (t.id == 300) {
            callback({ error: { msg: `this id(${t.id})} version(${t.version}) has some problem` } })
        } else
            callback({ success: { msg: `id = ${t.id} version(${t.version})` } })
    }
}

const sample_data_by_version = [
    { props: { id: 100, version: '1.01', name: 'test' } },
    { props: { id: 200, version: '4.00', name: 'another' } },
    { props: { id: 300, version: '1.01', name: 'some name' } },
    { props: { id: 400, version: '5.00', name: 'last' } }
]

try {
    let qJson = new queue({
        class_obj: class_test_by_non_matching_version,
        appender: 'version',
        stats: true,
        debug: true
    }).init({ input_data: sample_data_by_version, non_matching: ['1.01'] })

    qJson.process({}).then((success) => {
        qJson.logMsg(`version success: (${JSON.stringify(success)})`, {"type": "success"})
    }, (error) => {
        qJson.logMsg(`version errors: (${JSON.stringify(error)})`, {"type": "error"})
    })
} catch (e) {
    qJson.logMsg(`error running by_version_non_matching.js test`, {"type": "error"})
}

