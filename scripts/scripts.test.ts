import { test } from "bun:test"
import { getCurrentSafariTechPreviewUrlAndTitle } from "../packages/util/src/safari.js"

test("Scripts", async () => {
  const res = await getCurrentSafariTechPreviewUrlAndTitle()
  console.log(res)
  // expect().toEqual(expectedOutput)
})
