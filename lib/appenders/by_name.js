/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* by_name.ts
*/

var base = require('./base.js')

exports = module.exports = class by_name extends base {
	constructor(props) {
		super(props)
		var t = this
		try {
			t.aname = 'by_name'
			t.parent.logMsg(`by_name constructor`, {"type": "debug"})
			return t
		} catch (e) {
			t.parent.logMsg(e.message, {"type": "error"})
		}
	}
}