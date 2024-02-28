import Watcher from "watcher"
import { $ } from "bun"

const watcher = new Watcher("/Users/nikiv/src/config/karabiner")

watcher.on("change", async (filePath) => {
  if (filePath === "/Users/nikiv/src/config/karabiner/karabiner.edn") {
    // TODO: if error, show notification
    // on success it says `Done!`, can check for that?
    await $`/opt/homebrew/bin/goku`
  }
})
