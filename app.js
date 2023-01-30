
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* apps.js
*/

var cc = require("node-console-colors"),
    file_queue = new require('file-obj-queue'),
    file_requre_data = [
        { props: { id: 100, name: "all", path: "./lib/appenders/all.js", absolute_path: __filename, check: true } },
        { props: { id: 101, name: "func_all", path: "./lib/appenders/func_all.js", absolute_path: __filename, check: true } },
        { props: { id: 102, name: "top_one", path: "./lib/appenders/top_one.js", absolute_path: __filename, check: true } },
        { props: { id: 103, name: "bottom_one", path: "./lib/appenders/bottom_one.js", absolute_path: __filename, check: true } },
        { props: { id: 104, name: "sync_all", path: "./lib/appenders/sync_all.js", absolute_path: __filename, check: true } },
        { props: { id: 105, name: "status", path: "./lib/appenders/status.js", absolute_path: __filename, check: true } },
        { props: { id: 106, name: "name", path: "./lib/appenders/name.js", absolute_path: __filename, check: true } },
        { props: { id: 107, name: "version", path: "./lib/appenders/version.js", absolute_path: __filename, check: true } }
    ]

// all = require('./lib/appenders/all.js'),
//     top_one = require('./lib/appenders/top_one'),
//     bottom_one = require('./lib/appenders/bottom_one'),
//     func_all = require('./lib/appenders/func_all'),
//     sync_all = require('./lib/appenders/sync_all'),
//     by_status = require('./lib/appenders/by_status'),
//     by_name = require('./lib/appenders/by_name'),
//     version = require('./lib/appenders/version')

exports = module.exports = class QueueJson {
    constructor(props) {
        let t = this, fname = `app constructor`
        try {
            console.log(`${fname} 1001`, { "type": "debug" });
            t.class_obj_array = [];
            t.appenders = [{ name: 'all', obj: null }]

            t.props = props
            t.props.getParent = t.getParent

            if (typeof t.props != 'undefined' && typeof t.props.debug != 'undefined') {
                t.debug = t.props.debug
            } else {
                throw new Error(`props is not defined`)
            }

            t.qRequire = new file_queue().init({ input_data: file_requre_data })

            t.init = t.init.bind(t)
            t.process = t.process.bind(t)
            t.getParent = t.getParent.bind(t)
            t.logMsg = t.logMsg.bind(t)

            t.logMsg(`${fname} 1001`, { "type": "debug" });
            return t
        } catch (e) {
            t.logMsg(`${fname}: ${e}`, { "type": "error" })
        }
    }

    getParent = () => {
        return this
    }

    get_class_obj_array = () => {
        return this.class_obj_array
    }

    init = (props) => {
        let t = this, fname = `app init`, add = false, co, file_obj, obj
        try {
            t.logMsg(`${fname} appender(${t.props.appender})`, { "type": "debug" });
            try {
                try {
                    if (typeof props.input_data != 'undefined') {
                        props.input_data.map((dat, i) => {
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
                                case 'status':
                                case 'by_status':
                                    try {
                                        if (props.matching.indexOf(dat.props.status) > -1)
                                            add = true
                                    } catch { }
                                    try {
                                        if (props.non_matching.indexOf(dat.props.status) == -1)
                                            add = true
                                    } catch { }
                                    break
                                case 'name':
                                case 'by_name':
                                    try {
                                        if (props.matching.indexOf(dat.props.name) > -1)
                                            add = true
                                    } catch { }
                                    try {
                                        if (props.non_matching.indexOf(dat.props.name) == -1)
                                            add = true
                                    } catch { }
                                    break
                                case 'version':
                                    try {
                                        if (props.matching.indexOf(dat.props.version) > -1)
                                            add = true
                                    } catch { }
                                    try {
                                        if (props.non_matching.indexOf(dat.props.version) == -1)
                                            add = true
                                    } catch { }
                                    break

                                default:
                                    add = true
                            }
                            if (add) {
                                co = new t.props.class_obj(dat.props)
                                if (typeof dat.props.function_name == 'string') {
                                    co._getFuncName = () => {
                                        return dat.props.function_name
                                    }
                                }
                                t.class_obj_array.push(co)
                            }
                        })
                    } else
                        throw new Error('no input data array defined.')
                } catch (e) {
                    throw e
                }

            } catch (e) {
                throw `new class_obj: ${e}`
            }

            file_obj = t.qRequire.getFileObject()  
            if (typeof t.props != `undefined`) {
                if (typeof t.props.appender != `undefined` &&
                    typeof t.props.appender == 'string') {
                    t.props.getParent = t.getParent
                    file_obj.map((jsObj, i) => {
                        if (jsObj.name == t.props.appender) {
                            obj = require(jsObj.path)
                            eval(`t.${jsObj.name} = new obj(t.props)`)
                        }
                    })
                }
                return t
            }
            return t
        } catch (e) {
            t.logMsg(`${fname}: ${e}`, { "type": "error" })
        }
    }

    logMsg = (msg, props = {}) => {
        let t = this
        try {
            let t = this, tp
            if (typeof props != 'undefined' && typeof props.type != 'undefined') {
                switch (props.type) {
                    case 'debug':
                        if (!t.debug)
                            return
                        tp = "bg_dark_gray"
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
            }
            throw new Error('No props.type included')
        } catch (e) {
            console.log(`app log: ${e.message} for message (${msg})`)
        }
    }

    process = () => {
        let t = this, fname = `app process`, file_obj, jsObj, i
        let pro = { 'dat_array': [''] }
        try {
            file_obj = t.qRequire.getFileObject()  
            for (i = 0; i < file_obj.length; i++) {
                jsObj = file_obj[i]
                if (jsObj.name == t.props.appender) {
                    pro.dat_array.push(`${jsObj.name}`)
                    return eval(`t.${jsObj.name}.process()`)  
                }
            }
            throw new Error('no appender found to process')
        } catch (e) {
            t.logMsg(`${fname}: ${e}`, { "type": "error" })
        }
    }
}
