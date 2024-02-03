import { promises as fs, writeFileSync } from "fs"
import path from "path"
import os from "os"

// take in JSON of some kind and write it to ~/src/data
// returns path of file on success
export async function writeContentToSrcData(
  data: Array<any>,
  fileName: string,
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
  fileName: string,
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
  absolutePath: string,
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

export async function updateConfigFile(
  absolutePathToConfigFileFromHomeConfigFolder: string,
  key: string,
  value: string,
) {
  const configFilePath = path.join(
    os.homedir(),
    `.config/${absolutePathToConfigFileFromHomeConfigFolder}`,
  )

  try {
    let content = ""

    if (await fileOrFolderExists(configFilePath)) {
      content = await fs.readFile(configFilePath, "utf-8")
    } else {
      await fs.writeFile(configFilePath, "")
    }

    // Split the content by lines
    const lines = content.split("\n")

    // Find the line with the key
    const lineIndex = lines.findIndex((line) => line.startsWith(`${key}=`))

    // If the key exists, update the line. Otherwise, add a new line.
    if (lineIndex !== -1) {
      lines[lineIndex] = `${key}=${value}`
    } else {
      lines.push(`${key}=${value}`)
    }

    if (await fileOrFolderExists(configFilePath)) {
      await fs.unlink(configFilePath)
    }
    // Join the lines back together and write the file
    writeFileSync(configFilePath, lines.join("\n"))
  } catch (error) {
    console.error("Error writing to file:", error)
  }
}

export async function readConfigFileContent(
  absolutePathToConfigFileFromHomeConfigFolder: string,
) {
  const configFilePath = path.join(
    os.homedir(),
    `.config/${absolutePathToConfigFileFromHomeConfigFolder}`,
  )
  const file = Bun.file(configFilePath)
  return await file.text()
}

export async function readConfigFileValue(
  absolutePathToConfigFileFromHomeConfigFolder: string,
  key: string,
) {
  const configFilePath = path.join(
    os.homedir(),
    `.config/${absolutePathToConfigFileFromHomeConfigFolder}`,
  )
  const file = Bun.file(configFilePath)
  const text = await file.text()

  // Split the text by lines
  const lines = text.split("\n")

  // Iterate over the lines
  for (const line of lines) {
    // Split the line by the '=' character
    const parts = line.split("=")
    if (parts[0].trim() === key) {
      // If the key matches, return the value
      return parts[1].trim()
    }
  }

  // If no matching key is found, return null
  return null
}

// returns true if file/folder of filePath exists
export async function fileOrFolderExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

// creates folder if it doesn't exist. accepts ~ as home directory
export async function createFolderIfDoesntExist(folderPath: string) {
  // replace '~' with user's home directory
  const resolvedFolderPath = folderPath.startsWith("~")
    ? path.join(os.homedir(), folderPath.slice(1))
    : folderPath

  if (!(await fileOrFolderExists(resolvedFolderPath))) {
    await fs.mkdir(resolvedFolderPath, { recursive: true })
  }
}

export async function createFileIfDoesntExist(filePath: string) {
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
