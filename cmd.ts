import { defineCommand, runMain } from "citty"
const main = defineCommand({
  meta: {
    name: "ts",
    version: "1.0.0",
    description: "testing CLI",
  },
  args: {
    name: {
      type: "positional",
      description: "Your name",
      required: true,
    },
    friendly: {
      type: "boolean",
      description: "Use friendly greeting",
    },
  },
  run({ args }) {
    console.log(`${args.friendly ? "Hi" : "Greetings"} ${args.name}!`)
  },
})

runMain(main)
