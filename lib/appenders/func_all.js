/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* func_all.js
*/

var base = require('./base.js')

exports = module.exports = class func_all extends base {
	constructor(props) {
		super(props)
		var t = this
		try {
			t.aname = 'func_all'
			// t.parent.logMsg(`func_all constructor`, {"type": "debug"})
			return t
		} catch (e) {
			t.parent.logMsg(e.message, {"type": "error"})
		}
	}
}