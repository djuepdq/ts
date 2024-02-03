import { promises as fs } from "fs"
import path from "path"
import os from "os"
import { fileOrFolderExists } from "@nikiv/util"

// TODO: make own https://github.com/antfu/utils package and publish, for now link @nikiv/util
async function showTodo() {
  await createFileIfDoesntExist("~/.scripts/show-todo")
}

showTodo()

// TODO: all functions below are copies from @nikiv/util/src/file
// should be linking to that package instead of copying but import is breaking

async function fileOrFolderExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function createFolderIfDoesntExist(folderPath: string) {
  // replace '~' with user's home directory
  const resolvedFolderPath = folderPath.startsWith("~")
    ? path.join(os.homedir(), folderPath.slice(1))
    : folderPath

  if (!(await fileOrFolderExists(resolvedFolderPath))) {
    await fs.mkdir(resolvedFolderPath, { recursive: true })
  }
}

async function createFileIfDoesntExist(filePath: string) {
  // replace '~' with user's home directory
  const resolvedFilePath = filePath.startsWith("~")
    ? path.join(os.homedir(), filePath.slice(1))
    : filePath

  if (!(await fileOrFolderExists(resolvedFilePath))) {
    const directoryPath = path.dirname(resolvedFilePath)
    await createFolderIfDoesntExist(directoryPath)
    await fs.writeFile(resolvedFilePath, "", { flag: "wx" }) // 'wx' flag creates file if it does not exist and fails if it does
  }
}
