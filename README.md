
# react-native-wechat

## Getting started

`$ npm install react-native-wechat --save`

### Mostly automatic installation

`$ react-native link react-native-wechat`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-wechat` and add `RNWechat.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNWechat.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNWechatPackage;` to the imports at the top of the file
  - Add `new RNWechatPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-wechat'
  	project(':react-native-wechat').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-wechat/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-wechat')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNWechat.sln` in `node_modules/react-native-wechat/windows/RNWechat.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Wechat.RNWechat;` to the usings at the top of the file
  - Add `new RNWechatPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNWechat from 'react-native-wechat';

// TODO: What to do with the module?
RNWechat;
```
  