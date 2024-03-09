// TODO: should use packages (pnpm/bun workspace setup)
import { getCurrentMonth } from "../packages/util/src/date.js"

const args = Bun.argv

// if (args[2] === "top") {
// }

saveLink()
function saveLink() {
  const fileName = getCurrentMonth().toLocaleLowerCase() + `.json`
  console.log(fileName)
}
