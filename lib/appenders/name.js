/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* by_name.ts
*/

var base = require('./base.js')

exports = module.exports = class name extends base {
	constructor(props) {
		super(props)
		var t = this
		try {
			t.aname = 'name'
			t.parent.logMsg(`name constructor`, {"type": "debug"})
			return t
		} catch (e) {
			t.parent.logMsg(e.message, {"type": "error"})
		}
	}
}