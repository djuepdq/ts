import { createStore } from "tinybase"
import { readFile } from "node:fs/promises"

const store = createStore().setValuesSchema({
  filePath: { type: "string" },
  topicName: { type: "string" },
  content: { type: "string" },
})

export async function saveFileContent(path: string) {
  const fileContent = await readFile(path, { encoding: "utf8" })
  store.setValues({
    filePath: path,
    topicName: "karabiner",
    content: fileContent,
  })
  console.log(fileContent)
}

export async function getTopic() {
  console.log(store.getValues())
}

export async function runTinyBase() {
  await saveFileContent(
    "/Users/nikiv/src/docs/wiki/docs/macOS/apps/karabiner/karabiner.md"
  )
  getTopic()
}
