# console
A console libary using readline

Install the library: `npm i https://github.com/Eds-trash-can/console`

```js
const con	= require("rl-console")

// register a command
con.registercmd("command", (argv) => {
	console.log("Arguments passed to function:", argv)
})

// register a asyncronous command
con.registercmd("async", async (argv, resolve) => {
	console.log("*doing some async stuff*")
	resolve() // has to be executed before returning
}, true)

// register alias'es
con.alias("command", "alias")

con.prefix	// get or set the prefix of the shell
		// useful for navigation

// register exit hooks: (+250ms for async things)
con.registerexit(_ => {
	console.log("this gets executed before exit")
})

con.init()	// initializing the library
```

## Common commands:

- list, help or ?
  > Print out all registered commands

- eval
  > self explenatory

- exit
  > exits but first executes all closing hooks

- clear
  > self explenatory

- FE!
  > just quits the program
