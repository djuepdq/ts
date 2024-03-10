// TODO: should use packages (pnpm/bun workspace setup)
import {
  getCurrentMonth,
  getCurrentMonthAndDay,
} from "../packages/util/src/date.js"
import { appendObjectToJsonArrayFile } from "../packages/util/src/file.js"
import { getCurrentSafariUrlAndTitle } from "../packages/util/src/safari.js"

const args = Bun.argv

console.log(await main())
async function main() {
  const fileName = getCurrentMonth().toLocaleLowerCase() + `.json`
  const filePath = `~/data/links/${fileName}`
  let newLink
  switch (args[2]) {
    case "top":
      newLink = {
        ...(await getCurrentSafariUrlAndTitle()),
        timeAdded: getCurrentMonthAndDay(),
        top: true,
      }
      if (newLink.url === null) {
        throw new Error("No URL found")
      }
      await appendObjectToJsonArrayFile(filePath, newLink)
      return "done"
    default:
      newLink = {
        ...(await getCurrentSafariUrlAndTitle()),
        timeAdded: getCurrentMonthAndDay(),
      }
      if (newLink.url === null) {
        throw new Error("No URL found")
      }
      await appendObjectToJsonArrayFile(filePath, newLink)
      return "done"
  }
}
