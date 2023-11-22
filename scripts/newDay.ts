import { updateConfigFile } from "../packages/util/src/file.js"

await createFocusConfig()

// called once daily to reset
async function createFocusConfig() {
  let dailyBreaksAllowed = 2
  await updateConfigFile(
    ".focus",
    "dailyBreaksAllowed",
    dailyBreaksAllowed.toString()
  )
  await updateConfigFile(".focus", "forcedBreakTimeEnd", "")
}
