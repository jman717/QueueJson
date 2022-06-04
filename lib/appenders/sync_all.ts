/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* sync_all.ts
*/

var base = require('./base.ts')

exports = module.exports = class sync_all extends base {
	constructor(props: any) {
		super(props)
		var t = this
		try {
			t.aname = 'sync_all'
			// t.log(`sync_all constructor`, `debug`)
			return t
		} catch (e) {
			t.log(e, "error")
		}

	}
}