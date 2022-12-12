/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-12-11
* version.js
*/

var base = require('./base.js')

exports = module.exports = class version extends base {
	constructor(props) {
		super(props)
		var t = this
		try {
			t.aname = 'version'
			// t.log(`version constructor`, `debug`)
			return t
		} catch (e) {
			t.log(e, "error")
		}
	}
}