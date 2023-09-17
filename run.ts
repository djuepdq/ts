import { parseURL } from 'ufo'

const url = "https://www.edgedb.com"

console.log(url, "url")

let parsedUrl = parseURL(url)
console.log(parsedUrl.host)

let urlWithoutProtocol = parsedUrl.host

if (urlWithoutProtocol?.includes("www")) {
  urlWithoutProtocol = parsedUrl.host?.replace("www.", "")
}

console.log(urlWithoutProtocol)
