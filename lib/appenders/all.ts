/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* all.ts
*/

var base = require('./base.ts')

exports = module.exports = class all extends base {
	constructor(props: any) {
		super(props)
		var t = this
		try {
			t.aname = 'all'
			// t.log(`all constructor`, `debug`)
			return t
		} catch (e) {
			t.log(e, "error")
		}

	}
}