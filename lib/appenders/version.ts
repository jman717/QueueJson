/*
* @author Jim Manton: jrman@risebroadband.net
* @since 2022-05-24
* version.ts
*/

var base = require('./base.ts')

exports = module.exports = class version extends base {
	constructor(props: any) {
		super(props)
		var t = this
		try {
			t.aname = 'version'
			t.parent.logMsg(`version constructor`, {"type": "debug"})

			return t
		} catch (e) {
			t.parent.logMsg(e.message, {"type": "error"})

		}

	}
}