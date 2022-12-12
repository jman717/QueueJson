/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* by_status.ts
*/

var base = require('./base.js')

exports = module.exports = class by_status extends base {
	constructor(props) {
		super(props)
		var t = this
		try {
			t.aname = 'by_status'
			// t.log(`by_status constructor`, `debug`)
			return t
		} catch (e) {
			t.log(e, "error")
		}
	}
}