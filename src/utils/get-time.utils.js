export const getTimeOfEpisode = seconds => {
  let total = Math.round(seconds) / 60
  let [minutes, percent] = String(total).split('.')
  let second = Math.round((percent * 60) / 100).toString().substring(0, 2)
  let houre = 0
  if (minutes > 60) {
      total = minutes / 60
      let [h1, percent] = String(total).split('.');
      houre = h1,
      minutes = Math.round((percent * 60) / 100).toString().substring(0, 2)
  }
  if (String(houre).length == 1) houre = `0${houre}`
  if (String(minutes).length == 1) minutes = `0${minutes}`
  if (String(second).length == 1) second = `0${second}`

  return `${houre}:${minutes}:${second}`
}
