import clipboard from "clipboardy"
import open from "open"

const clipboardContent = clipboard.readSync()

async function getFinalUrl(url) {
  const response = await fetch(url, {
    method: "GET",
    redirect: "follow",
    mode: "no-cors",
  })

  return response.url
}

const initialUrl = `http://www.google.com/search?q=${encodeURIComponent(
  clipboardContent
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
