import osascript from "osascript-tag"
import os from "os"
import path from "path"
import fs from "fs"

// TODO: support safari tech preview

type Preferences = {
  safariAppIdentifier: string
}

type Tab = {
  uuid: string
  title: string
  url: string
  is_local: boolean
}

type LocalTab = Tab & {
  window_id: number
  index: number
}

async function executeJxa(script: string) {
  try {
    const result = await osascript.jxa({ parse: true })`${script}`
    return result
  } catch (err: unknown) {
    if (typeof err === "string") {
      console.error(err, "failed to execute jxa")
    }
  }
}

async function fetchLocalTabs(): Promise<LocalTab[]> {
  return executeJxa(`
    const safari = Application("com.apple.Safari");
    const tabs = [];
    safari.windows().map(window => {
      const windowTabs = window.tabs();
      if (windowTabs) {
        return windowTabs.map(tab => {
          tabs.push({
            uuid: window.id() + '-' + tab.index(),
            title: tab.name(),
            url: tab.url() || '',
            window_id: window.id(),
            index: tab.index(),
            is_local: true
          });
        })
      }
    });
    return tabs;
`)
}

const tabs = await fetchLocalTabs()

const links = tabs.map((tab) => {
  return {
    title: tab.title,
    url: tab.url,
  }
})

const folderPath = path.join(os.homedir(), "/data/safari-sessions")

let date = new Date()
let currentDateStr = `${date.getFullYear()}-${String(
  date.getMonth() + 1
).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

const filePath = path.join(folderPath + `/${currentDateStr}-safari-tabs.json`)

if (fs.existsSync(filePath)) {
  let number = 1
  let newPath = filePath

  while (fs.existsSync(newPath)) {
    newPath = path.join(
      folderPath,
      `/${currentDateStr}-safari-tabs-${number}.json`
    )
    number++
  }
  Bun.write(newPath, JSON.stringify(links))
} else {
  Bun.write(filePath, JSON.stringify(links))
}

// const file = Bun.file(file_path)
// const linksParsed = JSON.parse(await file.text())
// console.log(linksParsed)
