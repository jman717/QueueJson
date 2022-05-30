
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* apps.ts
*/

const cc = require("node-console-colors")
var all = require('./lib/appenders/all')

exports = module.exports = class QueueJson {

    private appenders: Array<any> = [
        { name: 'all', obj: null }
    ]
    private props: any;
    private all: any;
    private appenders_dir = './lib/appenders/'
    private debug: boolean = false;
    private appender_selected = 0;
    private blue: any;

    constructor(props: any) {
        let t = this, fname = `app constructor`
        try {
            t.props = props
            t.props.getParent = t.getParent
            t.props.log = t.log
            t.log(fname, "debug");

            if (typeof t.props != 'undefined' && typeof t.props.debug != 'undefined') {
                t.debug = t.props.debug
            } else {
                throw new Error(`props is not defined`)
            }

            t.log = t.log.bind(t)
            t.init = t.init.bind(t)
            t.process = t.process.bind(t)
            t.getParent = t.getParent.bind(t)
            return t
        } catch (e) {
            t.log(`${fname}: ${e}`, "error")
        }
    }

    getParent = () => {
        return this
    }

    init = (props: any) => {
        let t = this, fname = `app init`
        try {
            t.log(fname, "debug");
            t.appenders.map((aPen, i) => {
                if (aPen.name == t.props.appender &&
                    t.props.appender == 'all' &&
                    typeof t.props.class != 'undefined') {
                    // t.props.appender = props.appender
                    t.all = new all(this.props)
                    // t.log(`jrm debug 5/26 (${this.props.class_data[0]})`, "debug");
                    try {
                        t.log(`jrm debug 5/26 class(${typeof new t.props.class({})})`, "debug");
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
            return t
        } catch (e) {
            t.log(`${fname}: ${e}`, "error")
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
                case 'purple':
                    tp = "bg_purple"
                    break
                case 'success':
                    tp = "fg_green"
                    break
                default:
                    tp = 'bg_dark_gray'
            }
            console.log(cc.set(tp, msg))
            return t
        } catch (e) {
            console.log(`app log: ${e}`)
        }
    }

    process = (props: any) => {
        let t = this, fname = `app process`
        let pro = { 'dat_array': [''] }
        // let pro.dat_array : Element[] = [];
        try {
            t.log(`${fname} appender(${JSON.stringify(t.props)})`, "debug");
            switch (t.props.appender) {
                case 'all':
                    pro.dat_array.push('all')
                    return t.all.process()
                default:
                    throw new Error(`nothing to process`)
            }
        } catch (e) {
            t.log(`${fname}: ${e}`, "error")
        }

    }
}
