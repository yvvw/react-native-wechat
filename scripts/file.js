const fs = require('fs')

function fileInsert (path, insStr, insSign, avoidDupSign) {
  fileReadAndWrite(path, function (data) {
    if (avoidDupSign && data.indexOf(avoidDupSign) !== -1) return
    const position = data.indexOf(insSign)
    return data.slice(0, position) + insStr + data.slice(position)
  })
}

function fileReplace (path, search, replace) {
  fileReadAndWrite(path, function (data) {
    return data.replace(new RegExp(search, 'g'), replace)
  })
}

function fileReadAndWrite (path, callback) {
  if (!fs.existsSync(path)) return
  const encoding = 'utf8'
  let data = null

  try {
    data = fs.readFileSync(path, encoding)
  } catch (e) {
    return console.error(e)
  }

  const result = callback(data)

  try {
    fs.writeFileSync(path, result, encoding)
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  fileInsert,
  fileReplace
}
