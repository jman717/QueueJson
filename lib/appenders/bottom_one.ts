/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* bottom_one.ts
*/

var base = require('./base.ts')

exports = module.exports = class bottom_one extends base {
	constructor(props: any) {
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