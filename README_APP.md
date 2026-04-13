# 📱 健康管家 - 手机 App 安装指南

## ✅ 项目已创建完成！

**位置：** `/Users/rocket/Desktop/Health_App/`

---

## 📋 项目结构

```
Health_App/
├── www/                  # Web 文件（HTML/CSS/JS）
│   └── index.html        # 主页面
├── android/              # Android 原生项目
├── ios/                  # iOS 原生项目
├── capacitor.config.json # Capacitor 配置
└── package.json          # NPM 配置
```

---

## 🚀 构建 Android App

### 方法 1：Android Studio（推荐）

```bash
# 1. 同步项目
cd /Users/rocket/Desktop/Health_App
npx cap sync android

# 2. 在 Android Studio 打开
npx cap open android

# 3. 在 Android Studio 中：
#    - 点击 "Run" 按钮
#    - 选择模拟器或真机
#    - 运行 App
```

### 方法 2：命令行构建 APK

```bash
# 需要安装 Android SDK
cd android
./gradlew assembleDebug

# APK 位置：
# android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🍎 构建 iOS App

### 需要 Mac + Xcode

```bash
# 1. 同步项目
npx cap sync ios

# 2. 在 Xcode 打开
npx cap open ios

# 3. 在 Xcode 中：
#    - 选择签名团队
#    - 选择模拟器或真机
#    - 点击 Run
```

---

## 📱 快速测试（无需编译）

### 在浏览器测试
```bash
# 直接在浏览器打开
open www/index.html
```

### 使用 Live Server
```bash
# 安装 Live Server
npm install -g live-server

# 启动服务器
live-server www
```

---

## 📤 安装到手机

### Android 真机测试

**步骤：**
1. 手机开启"开发者选项"
2. 开启"USB 调试"
3. USB 连接电脑
4. Android Studio 中点击 "Run"
5. 自动安装到手机

### iOS 真机测试

**步骤：**
1. 需要 Apple Developer 账号（免费也可）
2. Xcode 中登录 Apple ID
3. 选择签名团队
4. USB 连接 iPhone
5. Xcode 中点击 "Run"

---

## 🎯 生成正式 APK

### 生成签名 APK

```bash
cd android

# 生成签名密钥
keytool -genkey -v -keystore health-app.keystore -alias health-app -keyalg RSA -keysize 2048 -validity 10000

# 配置签名（编辑 android/app/build.gradle）

# 生成 APK
./gradlew assembleRelease

# APK 位置：
# android/app/build/outputs/apk/release/app-release.apk
```

---

## 📊 App 功能

### 已集成的原生功能：

1. **相机** 📷
   - 拍照识别食物
   - 从相册选择
   - 高质量图片

2. **本地存储** 💾
   - 用户数据保存
   - 食物记录
   - 体重记录

3. **通知** 🔔（可扩展）
   - 喝水提醒
   - 吃饭提醒
   - 运动提醒

---

## 🔧 后续优化

### 可以添加的功能：

1. **推送通知**
   - 每日提醒
   - 目标达成通知

2. **离线支持**
   - 完全离线使用
   - 数据同步

3. **生物识别**
   - 指纹登录
   - 面部识别

4. **数据导出**
   - 导出 Excel
   - 生成 PDF 报告

5. **云服务**
   - 数据备份
   - 多设备同步

---

## 💡 上架应用商店

### Google Play Store
```
1. 创建 Google Play 开发者账号（$25 一次性）
2. 准备应用素材（图标、截图、描述）
3. 上传 APK
4. 审核（1-7 天）
5. 发布
```

### Apple App Store
```
1. 创建 Apple Developer 账号（$99/年）
2. 准备应用素材
3. 上传到 App Store Connect
4. 审核（1-3 天）
5. 发布
```

---

## 🎨 App 图标

**建议尺寸：**
- 512x512（Play Store）
- 1024x1024（App Store）

**放在：**
- `android/app/src/main/res/mipmap-*/ic_launcher.png`
- `ios/App/App/Assets.xcassets/AppIcon.appiconset/`

---

## 📞 有问题？

**常见问题：**

1. **Android Studio 找不到？**
   - 下载安装：https://developer.android.com/studio

2. **Xcode 找不到？**
   - Mac App Store 下载

3. **构建失败？**
   - 检查 Node.js 版本（建议 16+）
   - 检查 npm 依赖：`npm install`

---

**现在可以开始构建了！** 🚀

**下一步：**
1. 在浏览器测试：`open www/index.html`
2. 用 Android Studio 构建 APK
3. 安装到手机测试
4. 优化体验
5. 上架应用商店
