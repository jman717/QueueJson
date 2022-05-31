
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* all.ts
*/

var queue = require("../app.ts");

//This json data can persist in a database or in a flat file

// https://prasanthmj.github.io/typescript/serialize-javascript-objects/

class class_test {
    private id: number = 0
    private name: string = ''
    constructor(props: any) {
        let t = this
        t.id = props.id
        t.name = props.name

        t.process = t.process.bind(t)
    }

    process(callback: any) {
        let t = this
    }
}

const sample_data = [
    {props: {id: 1, name: 'test'}},
    {props: {id: 2, name: 'another'}},
    {props: {id: 3, name: 'another'}},
    {props: {id: 4, name: 'another'}}
]

try {
    let qJson = new queue({
        class_obj: class_test,
        appender: 'all',
        stats: true,
        debug: true
    }).init({ input_data: sample_data })

    qJson.process({ }).then((success: any) => {
        qJson.log(`all success: (${JSON.stringify(success)})`, 'success')
    }, (error: any) => {
        qJson.log(`all errors: (${JSON.stringify(error)})`, 'error')
    })
} catch (e) {
    console.log(`error running all.ts test`)
}

