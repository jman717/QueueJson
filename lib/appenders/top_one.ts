/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* all.ts
*/

var base = require('./base.ts')

exports = module.exports = class top_one extends base {
	constructor(props: any) {
		super(props)
		var t = this
		try {
			t.aname = 'top_one'
			// t.log(`top_one constructor`, `debug`)
			return t
		} catch (e) {
			t.log(e, "error")
		}

	}
}