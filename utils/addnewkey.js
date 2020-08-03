'use strict'

const colors = require('./colorcodes')
const coins = require('./../coins')

const args = process.argv.slice(2)

if( args === undefined || args.length == 0) {
	console.log(colors.codes.FgGreen + 'Usage: ' + colors.codes.FgWhite + 'node addnewkey.js <Coin Name> <Coin Network> <Key Type> <Key Value>' + colors.codes.Reset)
	console.log(colors.codes.FgYellow + 'Example Mainnet: ' + colors.codes.FgWhite + 'node addnewkey.js sapphire livenet privkeyWIF 4ij8ku6EC1gxisNE99HS1gDoNCYPPH8563MG1V7VKnQ51V38BeGF\n' + colors.codes.Reset)
	console.log(colors.codes.FgYellow + 'Example Testnet: ' + colors.codes.FgWhite + 'node addnewkey.js dash testnet privkeyWIF XBgDSjEd3voHjGEMMDvJbF5jJ5m9HtA7Bg4qBmY8ctwxrNKsQsbL\n' + colors.codes.Reset)
	return
}

var record = coins.saveKeyToDb(args[0], args[3], args[1])



