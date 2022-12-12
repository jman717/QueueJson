/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* all.ts
*/

var base = require('./base.js')

exports = module.exports = class all extends base {
	constructor(props) {
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