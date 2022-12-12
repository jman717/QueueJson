/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* top_one.js
*/

var base = require('./base.js')

exports = module.exports = class top_one extends base {
	constructor(props) {
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