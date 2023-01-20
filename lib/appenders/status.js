/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* by_status.ts
*/

var base = require('./base.js')

exports = module.exports = class status extends base {
	constructor(props) {
		super(props)
		var t = this
		try {
			t.aname = 'status'
			t.parent.logMsg(`by_status constructor`, {"type": "debug"})
			return t
		} catch (e) {
			t.parent.logMsg(e.message, {"type": "error"})
		}
	}
}