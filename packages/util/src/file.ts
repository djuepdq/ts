import { promises as fs } from "fs"
import path from "path"
import os from "os"

// take in JSON of some kind and write it to ~/src/data
// returns path of file on success
export async function writeContentToSrcData(
  data: Array<any>,
  fileName: string
): Promise<string | void> {
  const srcDataDir = path.join(os.homedir(), "src", "data")

  const filePath = path.join(srcDataDir, fileName)

  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    console.log(`File written successfully to ${filePath}`)
    return filePath
  } catch (error) {
    console.error("Error writing to file:", error)
  }
}

// take in JSON of some kind and write it to ~/Desktop
// returns path of file on success
export async function writeContentToDesktopFile(
  data: Array<any>,
  fileName: string
): Promise<string | void> {
  const desktopDir = path.join(os.homedir(), "Desktop")
  const filePath = path.join(desktopDir, fileName)

  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    console.log(`File written successfully to ${filePath}`)
    return filePath
  } catch (error) {
    console.error("Error writing to file:", error)
  }
}

// pass import.meta.path into this function as first arg
export async function readFileContent(filePath: string) {
  const file = Bun.file(filePath)
  return await file.text()
}

export function getFilePathOfFileFromProvidedAbsolutePathFromExecutedBunFile(
  filePathOfBunFile: string,
  absolutePath: string
) {
  const directoryPath = path.dirname(filePathOfBunFile)
  const filePath = path.join(directoryPath, absolutePath)
  return filePath
}

export async function zipFile(filePath: string) {
  const file = Bun.file(filePath)
  const data = new Uint8Array(await file.arrayBuffer())
  const gzipped = Bun.gzipSync(data)
  const gzFilePath = `${filePath}.gz`
  Bun.write(gzFilePath, gzipped)
}
