const path = require('path')
const file = require('./file')

const postlink = () => {
  const projectDir = path.dirname(__filename) + '/../../../..'

  file.fileReplace(
    projectDir + '/android/settings.gradle',
    ':@yyyyu/react-native-wechat',
    ':react-native-wechat'
  )
  file.fileReplace(
    projectDir + '/android/app/build.gradle',
    ':@yyyyu/react-native-wechat',
    ':react-native-wechat'
  )

  console.log('\nLink finished, hit <Enter> to continue')
}

postlink()
