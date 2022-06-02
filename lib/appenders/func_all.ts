/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* func_all.ts
*/

var base = require('./base.ts')

exports = module.exports = class func_all extends base {
	constructor(props: any) {
		super(props)
		var t = this
		try {
			t.aname = 'func_all'
			// t.log(`func_all constructor`, `debug`)
			return t
		} catch (e) {
			t.log(e, "error")
		}

	}
}