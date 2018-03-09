
Pod::Spec.new do |s|
  s.name         = "RNWechat"
  s.version      = "1.0.0"
  s.summary      = "react native wechat"
  s.description  = <<-DESC
                  react native for wechat
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  s.author             = { "dongdayu" => "g592842897@gmail.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/yyyyu/react-native-wechat.git", :tag => "master" }
  s.source_files  = "RNWechat.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  s.dependency "WechatOpenSDK"

end
