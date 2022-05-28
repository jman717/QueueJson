
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* default.ts
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
    `{props: {id: 1, name: 'test'}}`,
    `{props: {id: 2, name: 'another'}}`
]

let qJson = new queue().init({ appender: 'default', 
                                input_data: sample_data, 
                                class: new class_test({}), 
                                debug: true }) 
