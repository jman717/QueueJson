/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* bottom_one.ts
*/

var base = require('./base.js')

exports = module.exports = class bottom_one extends base {
	constructor(props) {
		super(props)
		var t = this
		try {
			t.aname = 'bottom_one'
			// t.log(`bottom_one constructor`, `debug`)
			return t
		} catch (e) {
			t.log(e, "error")
		}
	}
}