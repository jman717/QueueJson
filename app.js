
/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* apps.js
*/

const cc = require("node-console-colors"),
    all = require('./lib/appenders/all.js'),
    top_one = require('./lib/appenders/top_one'),
    bottom_one = require('./lib/appenders/bottom_one'),
    func_all = require('./lib/appenders/func_all'),
    sync_all = require('./lib/appenders/sync_all'),
    by_status = require('./lib/appenders/by_status'),
    by_name = require('./lib/appenders/by_name'),
    version = require('./lib/appenders/version')

exports = module.exports = class QueueJson {
    constructor(props) {
        let t = this, fname = `app constructor`
        try {
            t.class_obj_array = [];
            t.appenders = [{ name: 'all', obj: null }]

            t.props = props
            t.props.getParent = t.getParent

            if (typeof t.props != 'undefined' && typeof t.props.debug != 'undefined') {
                t.debug = t.props.debug
            } else {
                throw new Error(`props is not defined`)
            }

            t.init = t.init.bind(t)
            t.process = t.process.bind(t)
            t.getParent = t.getParent.bind(t)
            t.logMsg = t.logMsg.bind(t)

            t.logMsg(fname, { "type": "debug" });
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
        let t = this, fname = `app init`, add = false, co
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
            t.appenders.map((aPen, i) => {

                switch (t.props.appender) {
                    case 'all':
                        t.all = new all(t.props)
                        break
                    case 'top_one':
                        t.top_one = new top_one(t.props)
                        break
                    case 'func_all':
                        t.func_all = new func_all(t.props)
                        break
                    case 'sync_all':
                        t.sync_all = new sync_all(t.props)
                        break
                    case 'status':
                    case 'by_status':
                        t.by_status = new by_status(t.props)
                        break
                    case 'name':
                    case 'by_name':
                        t.by_name = new by_name(t.props)
                        break
                    case 'version':
                        t.version = new version(t.props)
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

    process = (props) => {
        let t = this, fname = `app process`
        let pro = { 'dat_array': [''] }
        try {
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
                case 'func_all':
                    pro.dat_array.push('func_all')
                    return t.func_all.process()
                case 'status':
                case 'by_status':
                    pro.dat_array.push('by_status')
                    return t.by_status.process(props)
                case 'name':
                case 'by_name':
                    pro.dat_array.push('by_name')
                    return t.by_name.process(props)
                case 'version':
                    pro.dat_array.push('version')
                    return t.version.process(props)
                case 'sync_all':
                    pro.dat_array.push('sync_all')
                    return t.sync_all.process()
                default:
                    throw new Error(`nothing to process`)
            }
        } catch (e) {
            t.logMsg(`${fname}: ${e}`, { "type": "error" })
        }
    }
}
