import { parseURL } from "ufo"

export function splitUrlByProtocol(url: string) {
  let parsedUrl = parseURL(url)
  console.log(parsedUrl)
  let host = parsedUrl.host
  if (host?.includes("www")) {
    host = host?.replace("www.", "")
  }
  let urlWithoutProtocol = host + parsedUrl.pathname + parsedUrl.search

  let protocol = parsedUrl.protocol
  if (protocol) {
    protocol = protocol.replace(":", "")
  }
  return [urlWithoutProtocol, protocol]
}
