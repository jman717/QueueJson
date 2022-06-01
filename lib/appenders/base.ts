/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* base.ts
*/

var qObj = require("queueobj");

exports = module.exports = class base {
    private log: any;
    private dt_start: any;
    private resolve_array: any;
    private reject_array: any;
    private qObj: any;
    private stats: boolean = false;
    private parent: any;

    constructor(props: any) {
        let t = this, fname = `base constructor`
        try {
            t.parent = props.getParent()
            t.log = t.parent.log
            // t.log(fname, "debug");
            t.resolve_array = []
            t.reject_array = []

            t.qObj = new qObj()
            t.qObj.load({ appender: props.appender, stats: props.stats })

            t.process = t.process.bind(t)
            t.process_all = t.process_all.bind(t)
            return t
        } catch (e) {
            t.log(`${fname}: ${e}`, "error")
            throw e
        }
    }

    process = () => {
        let t = this, fname = `base process`
        try {
            t.dt_start = new Date(); // start measuring time

            // t.log(fname, "debug");
            return new Promise((resolve, reject) => {
                t.resolve_array.push(resolve)
                t.reject_array.push(reject)
                t.process_all()
            });
        } catch (e) {
            t.log(`${fname}: ${e}`, "error")
        }
    }

    process_all = () => {
        let t = this, fname = `base process_all`, coa
        try {
            // t.log(fname, "debug");

            coa = t.parent.get_class_obj_array()

            if (coa.length == 0)
                throw new Error('class object array has nothing to process')

            coa.map((dat: any, i: number) => {
                dat.log = t.log

                t.qObj.add(dat)
            })

            t.qObj.process({}).then((res: any) => {
                t.resolve_array[0]({ res })
            }, (err: any) => {
                t.reject_array[0]({ err })
            })
        } catch (e) {
            t.log(`${fname}: ${e}`, "error")
        }
    }
}
