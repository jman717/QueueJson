/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* default.ts
*/

var base = require('./base.ts')

exports = module.exports = class _default extends base {
	constructor(props: any) {
		super(props)
		var t = this
		try {
			t.aname = 'default'
			t.log(`_default constructor`, `debug`)
			return t
		} catch (e) {
			t.log(e, "error")
		}

	}
}