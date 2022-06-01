
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* apps.ts
*/

const cc = require("node-console-colors")
var all = require('./lib/appenders/all'),
    top_one = require('./lib/appenders/top_one'),
    bottom_one = require('./lib/appenders/bottom_one')

exports = module.exports = class QueueJson {

    private appenders: Array<any> = [
        { name: 'all', obj: null }
    ]
    private props: any;
    private all: any;
    private top_one: any;
    private bottom_one: any;
    private appenders_dir = './lib/appenders/'
    private debug: boolean = false;
    private appender_selected = 0;
    private blue: any;
    private class_obj_array: any = [];

    constructor(props: any) {
        let t = this, fname = `app constructor`
        try {
            t.props = props
            t.props.getParent = t.getParent
            t.props.log = t.log

            if (typeof t.props != 'undefined' && typeof t.props.debug != 'undefined') {
                t.debug = t.props.debug
            } else {
                throw new Error(`props is not defined`)
            }

            t.log = t.log.bind(t)
            t.init = t.init.bind(t)
            t.process = t.process.bind(t)
            t.getParent = t.getParent.bind(t)

            // t.log(fname, "debug");
            return t
        } catch (e) {
            t.log(`${fname}: ${e}`, "error")
        }
    }

    getParent = () => {
        return this
    }

    get_class_obj_array = () => {
        return this.class_obj_array
    }

    init = (props: any) => {
        let t = this, fname = `app init`, add = false
        try {
            // t.log(fname, "debug");
            try {
                try {
                    if (typeof props.input_data != 'undefined') {
                        props.input_data.map((dat: any, i: number) => {
                            add = false
                            switch (t.props.appender) {
                                case 'top_one':
                                    if (i == 0)
                                        add = true
                                    break
                                case 'bottom_one':
                                    if (i == (props.input_data.length - 1))
                                        add = true
                                    break
                                default:
                                    add = true
                            }
                            if (add)
                                t.class_obj_array.push(new t.props.class_obj(dat.props))
                        })
                    } else
                        throw new Error('no input data array defined.')
                } catch (e) {
                    throw e
                }

            } catch (e) {
                throw `new class_obj: ${e}`
            }
            t.appenders.map((aPen, i) => {

                switch (t.props.appender) {
                    case 'all':
                        t.all = new all(t.props)
                        break
                    case 'top_one':
                        t.top_one = new top_one(t.props)
                        break
                    case 'bottom_one':
                        t.bottom_one = new bottom_one(t.props)
                        break
                    default:
                        throw new Error(`appender(${t.props.appender}) is not defined`)
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
                case 'white':
                    tp = "bg_white"
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
        try {
            // t.log(`${fname} appender(${JSON.stringify(t.props)})`, "debug");
            switch (t.props.appender) {
                case 'all':
                    pro.dat_array.push('all')
                    return t.all.process()
                case 'top_one':
                    pro.dat_array.push('top_one')
                    return t.top_one.process()
                case 'bottom_one':
                    pro.dat_array.push('bottom_one')
                    return t.bottom_one.process()
                default:
                    throw new Error(`nothing to process`)
            }
        } catch (e) {
            t.log(`${fname}: ${e}`, "error")
        }

    }
}
