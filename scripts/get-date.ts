import {
  getCurrentMonth,
  getCurrentMonthAndDay,
} from "../packages/util/src/date.js"

const args = Bun.argv

console.log(main())
function main() {
  switch (args[2]) {
    case "month":
      return getCurrentMonth()
    case "month-with-number":
      return getCurrentMonthAndDay()
    default:
      break
  }
}
