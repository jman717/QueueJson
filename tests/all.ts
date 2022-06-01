
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* all.ts
*/

var queue = require("../app.ts");

//This json data can persist in a database or in a flat file

// https://prasanthmj.github.io/typescript/serialize-javascript-objects/

class class_test_all {
    private id: number = 0
    private name: string = ''
    private log: any
    constructor(props: any) {
        let t = this
        t.id = props.id
        t.log = props.log
        t.name = props.name

        t.process = t.process.bind(t)
    }

    process(callback: any) {
        let t = this
        if (t.id == 3) {
            callback({ error: { msg: `this id(${t.id}) has some problem` } })
        } else
            callback({ success: { id: t.id } })
    }

}

const sample_data_all = [
    { props: { id: 1, name: 'test' } },
    { props: { id: 2, name: 'another' } },
    { props: { id: 3, name: 'numb 3' } },
    { props: { id: 4, name: 'numb 4' } }
]

try {
    let qJson = new queue({
        class_obj: class_test_all,
        appender: 'all',
        stats: true,
        debug: true
    }).init({ input_data: sample_data_all })

    qJson.process({}).then((success: any) => {
        qJson.log(`all success: (${JSON.stringify(success)})`, 'success')
    }, (error: any) => {
        qJson.log(`all errors: (${JSON.stringify(error)})`, 'error')
    })
} catch (e) {
    console.log(`error running all.ts test`)
}

