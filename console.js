// this file is part of the console.js libary by derzombiiie
// this is libary is under the GPL-3.0-or-later license
const readline = require("readline")

module.exports.registerdcmds = {}


this.prefix = ""
this.init = () => {
	this.rl = readline.createInterface({
		input:  process.stdin,
		output: process.stdout
	})

	process.stdout.write(this.prefix + "> ")
	this.rl.on("line", (i) => {
		module.exports.eval(i)
		process.stdout.write(this.prefix + "> ")
	})	
	return module.exports
}
this.eval = ( cmd ) => {
	let split = cmd.split( " " )
	let comm  = split[0]
	split.shift()
	let args  = split
	args.unshift(this.prefix)

	if (! comm ) return // if cmd empty dont do anything

	if ( comm === "FE!") {
		process.exit(-1) // Force exit
	}

	if ( module.exports.registerdcmds[comm] ) {
		module.exports.registerdcmds[comm](args)
	} else {
		console.log(`Bad command! '${ comm }'`)			
	}
}
this.registercmd = ( cmd, callback ) => {
	this.registerdcmds[cmd] = callback
}
this.alias = ( cmd, alias ) => {
	this.registerdcmds[alias] = this.registerdcmds[cmd]
}
this.exitcmds = []
this.registerexit = ( callback ) => {
	this.push( callback )
}

// preregisterd commands:
this.registerdcmds["list"] = () => {
	console.log( Object.keys(this.registerdcmds).sort().join(", ") )
}
this.registerdcmds["help"] = () => {
	this.eval("list")
}
this.registerdcmds["?"] = () => {
	this.eval("help")
}
this.registerdcmds["eval"] = () => {
	try {
		console.log(eval(args.join(" ")))
	} catch {
		console.log("Couldn't execute!")
	}
}
this.registerdcmds["exit"] = () => {
	this.exitcmds.forEach((cb) => {cb()})

	setTimeout(_ => process.exit(0), 250)
}
this.registerdcmds["clear"] = () => {
	console.clear()
}
