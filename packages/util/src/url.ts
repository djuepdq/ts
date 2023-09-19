import { parseURL } from "ufo"

export function splitUrlByProtocol(url: string) {
  let parsedUrl = parseURL(url)
  console.log(parsedUrl)
  let urlWithoutProtocol = parsedUrl.host + parsedUrl.pathname
  let protocol = parsedUrl.protocol
  if (urlWithoutProtocol?.includes("www")) {
    // @ts-ignore
    urlWithoutProtocol = parsedUrl.host?.replace("www.", "")
  }
  // @ts-ignore
  protocol = protocol.replace(":", "")
  return [urlWithoutProtocol, protocol]
}
