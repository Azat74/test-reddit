const withZero = (num) => (num < 10 ? '0' + num : num)

export const formatDate = (date) => {
  const newDate = new Date(date * 1000)

  return `${withZero(newDate.getDate())}-${withZero(
    newDate.getMonth() + 1,
  )}-${newDate.getFullYear()}`
}
