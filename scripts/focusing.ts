console.log(focusing())

// true = time to focus
// false = can take break
function focusing() {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()

  // check if current time is within the specified break intervals
  if (
    (hours === 10 && minutes >= 30 && minutes <= 50) ||
    (hours === 12 && minutes >= 30 && minutes <= 50) ||
    (hours === 14 && minutes >= 30 && minutes <= 50) ||
    (hours === 16 && minutes >= 30 && minutes <= 50) ||
    (hours === 18 && minutes >= 30 && minutes <= 50) ||
    (hours === 20 && minutes >= 30 && minutes <= 50)
  ) {
    return false
  }

  return true
}
