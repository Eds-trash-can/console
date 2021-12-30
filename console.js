// this file is part of the console.js libary by derzombiiie
// this is libary is under the GPL-3.0-or-later license
const readline = require("readline")

this.registerdcmds = {}
this.registerdcmdstype = {}

this.prefix = ""
this.init = () => {
	this.rl = readline.createInterface({
		input:  process.stdin,
		output: process.stdout
	})

	process.stdout.write(this.prefix + "> ")
	this.rl.on("line", (cmd) => {
		this.eval(cmd, _ => process.stdout.write(this.prefix + "> "))
	})	
	return this
}
this.eval = ( cmd, resolve ) => {
	debugger
	let split = cmd.split(" ")
	let comm  = split[0]
	split.shift()
	let args  = JSON.parse(JSON.stringify(split));
	args.unshift(this.prefix)

	if ( !comm ) return resolve() // if cmd empty dont do anything

	if ( comm === "FE!") {
		process.exit(-1) // Force exit
	}

	if ( this.registerdcmds[comm] ) {
		console.log("cmd", cmd, "-", comm, "- type", this.registerdcmdstype[comm])

		if( !this.registerdcmdstype[comm] ) { // check if func uses res
			this.registerdcmds[comm](args)
			if(resolve) resolve()
		} else {
			this.registerdcmds[comm](args, resolve)
		}
	} else {
		console.log(`Bad command! '${comm}'`)
		if(resolve) resolve()
	}
}

this.registercmd = ( cmd, callback, res = false ) => {
	this.registerdcmds[cmd] = callback
	this.registerdcmdstype[cmd] = res
	return this
}
this.alias = ( cmd, alias ) => {
	this.registerdcmds[alias] = this.registerdcmds[cmd]
	this.registerdcmdstype[alias] = this.registerdcmdstype[cmd]
	return this
} 

this.exitcmds = []
this.registerexit = ( callback ) => {
	this.push( callback )
}

// preregisterd commands:
this.registercmd("list", () => {
	console.log( Object.keys(this.registerdcmds).sort().join(", ") )
})
this.alias("list", "help")
this.alias("help", "?")

this.registercmd("eval", () => {
	try {
		console.log(eval(args.join(" ")))
	} catch {
		console.log("Couldn't execute!")
	}
})

this.registercmd("exit", () => {
	this.exitcmds.forEach((cb) => {cb()})

	setTimeout(_ => process.exit(0), 250)
})

this.registercmd("clear", () => {
	console.clear()
})
