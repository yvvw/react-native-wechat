const path = require('path')
const file = require('./file')

const postinstall = () => {
  const nodeModuleDir = path.dirname(__filename) + '/../../..'

  const modifies = {
    get reactSpec () {
      const avoidDupSign = '# Dependency'
      return [
        nodeModuleDir + '/react-native/React.podspec',
        avoidDupSign + '\n  s.subspec "Dependency" do |ss|\n    ss.source_files         = "React/**/*.h"\n  end\n\n  ',
        's.subspec "Core" do |ss|',
        avoidDupSign
      ]
    }
  }

  file.fileInsert(...modifies.reactSpec)
}

postinstall()
