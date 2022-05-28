
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* apps.ts
*/

const cc = require("node-console-colors")
var _default = require('./lib/appenders/default')

class QueueJson {

    private appenders: Array<any> = [
        { name: 'default', obj: null }
    ]
    private props: any;
    private appenders_dir = './lib/appenders/'
    private debug: boolean = false;
    private appender_selected = 0;
    private blue: any;

    constructor() {
        let t = this
        try {
            t.log(`QueueJson constructor`, `debug`)

            t.log = t.log.bind(t)
            return t
        } catch (e) {
            // e.message = "queueJson app.js init error: " + e.message
            t.log(e)
        }
    }

    init = (props: any) => {
        let t = this
        try {
            t.props = props
            if (typeof t.props != 'undefined' && typeof t.props.debug != 'undefined') {
                t.debug = t.props.debug
            }
            t.log("QueueJson init", "debug");
            t.props.parent = t
            t.appenders.map((aPen, i) => {
                if (aPen.name == t.props.appender && 
                    t.props.appender == 'default' &&
                    typeof t.props.class != 'undefined') {
                    aPen.obj = new _default(this.props)
                    // t.log(`jrm debug 5/26 (${this.props.class_data[0]})`, "debug");
                    try {
                        t.log(`jrm debug 5/26 class(${typeof t.props.class})`, "debug");
                    } catch (e) {
                        t.log(`jrm debug 5/26 class error (${e})`, "debug");
                    }


                    // Object.assign(this, this.props.class_data[0]);

                    // // https://stackoverflow.com/questions/52315147/json-to-javascript-class
                    // // https://prasanthmj.github.io/typescript/serialize-javascript-objects/
                    // t.log(`jrm debug 5/26 (${this.testJrm})`, "debug");

                    // var p = eval("new " + this.props.class_data[0] + "()");

                    // var nameOfThang = 'Person';
                    // var nameOfThingzName = 'The Dude';

                    // var thangs = { Person: { name: 'Legowski' }, Cars: {} };
                    // var person = new (eval(thangs[nameOfThang].constructor))();
                    // // person.name = new (eval(thangs.Person.name.constructor))(nameOfThingzName).toString();

                    // console.log('@thang, #Person', person);
                }
            })
        } catch (e) {
            t.log(e, "error")
        }
    }

    log = (msg: any, type?: string) => {
        try {
            let t = this, tp
            switch (type) {
                case 'debug':
                    if (!t.debug)
                        return
                    tp = "bg_dark_cyan"
                    break
                case 'error':
                    tp = "fg_red"
                    break
                default:
                    tp = 'bg_dark_gray'
            }
            console.log(cc.set(tp, msg))
            return t
        } catch (e) {
            console.log(e)
        }
    }
}

exports = module.exports = function () {
    return new QueueJson()
}
