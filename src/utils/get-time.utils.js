export const getTimeOfEpisode = seconds => {
  let total = Math.round(seconds) / 60
  let [minutes, percent] = String(total).split('.')
  let second = Math.round((percent * 60) / 100)
    .toString()
    .substring(0, 2)
  let houre = 0
  if (minutes > 60) {
    total = minutes / 60
    let [h1, percent] = String(total).split('.')
    ;(houre = h1),
      (minutes = Math.round((percent * 60) / 100)
        .toString()
        .substring(0, 2))
  }
  if (String(houre).length == 1) houre = `0${houre}`
  if (String(minutes).length == 1) minutes = `0${minutes}`
  if (String(second).length == 1) second = `0${second}`

  return `${houre}:${minutes}:${second}`
}

export const getTimeOfCourse = (chapters = []) => {
  let time,
    hour,
    minute,
    second = 0
  for (const chapter of chapters) {
    if (Array.isArray(chapter?.episodes)) {
      for (const episode of chapter.episodes) {
        if (episode?.time) time = episode.time.split(':') // [hour, min, second]
        else time = '00:00:00'.split(':')
        if (time.length == 3) {
          second += Number(time[0]) * 3600 // convert hour to second
          second += Number(time[1]) * 60 // convert minute to second
          second += Number(time[2]) //sum second with seond
        } else if (time.length == 2) {
          //05:23
          second += Number(time[0]) * 60 // convert minute to second
          second += Number(time[1]) //sum second with seond
        }
      }
    }
  }

  hour = Math.floor(second / 3600) //convert second to hour
  minute = Math.floor(second / 60) % 60 //convert second to mintutes
  second = Math.floor(second % 60) //convert seconds to second

  if (String(hour).length == 1) hour = `0${hour}`
  if (String(minute).length == 1) minute = `0${minute}`
  if (String(second).length == 1) second = `0${second}`

  return hour + ':' + minute + ':' + second
}
