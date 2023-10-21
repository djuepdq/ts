function getAge(dateString: string): string {
  const today = new Date()
  const [day, month, year] = dateString.split("/")
  const birthDate = new Date(`${month}/${day}/${year}`)

  let years = today.getFullYear() - birthDate.getFullYear()
  let months = today.getMonth() - birthDate.getMonth()
  let days = today.getDate() - birthDate.getDate()

  if (months < 0 || (months === 0 && days < 0)) {
    years--
    months += 12
  }

  if (days < 0) {
    months--
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate()
  }

  return `${years} years ${months} months ${days} days`
}

console.log(getAge("12/04/1995"))
