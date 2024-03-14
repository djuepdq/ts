import fs from "fs"
import open from "open"
import path from "path"
import { getClipboard } from "../packages/util/clipboard.js"

function findNearestGitFolder(startPath) {
  let currentPath = startPath

  while (currentPath !== path.parse(currentPath).root) {
    const gitPath = path.join(currentPath, ".git")

    if (fs.existsSync(gitPath) && fs.statSync(gitPath).isDirectory()) {
      return gitPath
    }

    currentPath = path.dirname(currentPath)
  }

  return null
}

const gitFolderPath = findNearestGitFolder(getClipboard())

if (gitFolderPath) {
  console.log(gitFolderPath, "path")
  const todoPath = path.join(gitFolderPath, "..", "todo.md")
  if (fs.existsSync(todoPath)) {
    await open(todoPath, {
      app: {
        name: "/Applications/Cursor Nightly.app",
      },
    })
  } else {
    throw new Error("todo.md not found")
  }
} else {
  // TODO: should it be throw new Error() or console.error()?
  throw new Error(".git folder not found")
}
