import { promises as fs } from "fs"
import path from "path"
import os from "os"


// take in JSON of some kind and write it to ~/src/data
export async function writeContentToSrcData(
  data: Array<any>,
  fileName: string,
): Promise<void> {
  const srcDataDir = path.join(os.homedir(), "src", "data")
  console.log(srcDataDir, "data dir")

  // const filePath = path.join(desktopDir, fileName)

  // try {
  //   await fs.writeFile(filePath, JSON.stringify(data, null, 2))
  //   console.log(`File written successfully to ${filePath}`)
  // } catch (error) {
  //   console.error("An error occurred:", error)
  // }
}

// take in JSON of some kind and write it to ~/Desktop
export async function writeContentToDesktopFile(
  data: Array<any>,
  fileName: string,
): Promise<void> {
  const desktopDir = path.join(os.homedir(), "Desktop")
  const filePath = path.join(desktopDir, fileName)

  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    console.log(`File written successfully to ${filePath}`)
  } catch (error) {
    console.error("An error occurred:", error)
  }
}
