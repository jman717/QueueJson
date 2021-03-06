
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* top_one.ts
*/

var queue = require("../app.ts");

class class_test_top_one {
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

const sample_data_top_one = [
    { props: { id: 100, name: 'test' } },
    { props: { id: 200, name: 'another' } },
    { props: { id: 300, name: 'some name' } },
    { props: { id: 400, name: 'last' } }
]

try {
    let qJson = new queue({
        class_obj: class_test_top_one,
        appender: 'top_one',
        stats: true,
        debug: true
    }).init({ input_data: sample_data_top_one })

    qJson.process({}).then((success: any) => {
        qJson.log(`all success: (${JSON.stringify(success)})`, 'success')
    }, (error: any) => {
        qJson.log(`all errors: (${JSON.stringify(error)})`, 'error')
    })
} catch (e) {
    console.log(`error running all.ts test`)
}

