/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* sync_all.js
*/

var base = require('./base.js')

exports = module.exports = class sync_all extends base {
	constructor(props) {
		super(props)
		var t = this
		try {
			t.aname = 'sync_all'
			// t.log(`sync_all constructor`, `debug`)
			return t
		} catch (e) {
			t.log(e, "error")
		}
	}
}