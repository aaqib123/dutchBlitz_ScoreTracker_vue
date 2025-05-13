export function getGuid() {
  // Generate a 10 digit unique ID
  return 'xxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r % 4) + 8
    return v.toString(16)
  })
}
