import { promises as fs } from "fs"
import { fileExists } from "@nikiv/util"

// TODO: use https://github.com/antfu/utils
// link util package
async function showTodo() {
  // console.log(await fileExists("/Users/nikiv/.scripts"))
}

showTodo()

// async function fileExists(filePath: string): Promise<boolean> {
//   try {
//     await fs.access(filePath)
//     return true
//   } catch {
//     return false
//   }
// }
