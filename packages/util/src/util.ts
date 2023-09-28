export function removeTrailingSlash(str: string) {
  if (str.endsWith("/")) {
    return str.slice(0, -1)
  }
  return str
}
