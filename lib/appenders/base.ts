/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* default.ts
*/


exports = module.exports = class base {
    private log: any;

    constructor(props: any) {
        let t = this
        try {
            t.log = props.parent.log
            return t
        } catch (e) {
            t.log(e, "error")
        }
    }
}