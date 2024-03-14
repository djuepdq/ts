import open from "open"
import { getClipboard } from "../packages/util/clipboard.js"

async function getFinalUrl(url) {
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow",
    mode: "no-cors",
  })

  return response.url
}

const initialUrl = `http://www.google.com/search?q=${encodeURIComponent(
  getClipboard(),
)}&btnI`
getFinalUrl(initialUrl).then(async (redirectUrl) => {
  if (redirectUrl) {
    const urlObj = new URL(redirectUrl)
    const finalUrl = urlObj.searchParams.get("q")
    if (
      finalUrl &&
      (finalUrl.startsWith("http://") || finalUrl.startsWith("https://"))
    ) {
      await open(finalUrl)
    }
  }
})
