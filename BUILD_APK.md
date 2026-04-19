# 📦 生成 APK 文件 - 两种方法

---

## 方法 A：GitHub Actions（推荐！不用安装 Java）⭐⭐⭐

### 你的项目已经有自动构建配置！

### 第 1 步：推送到 GitHub

```bash
cd /Users/rocket/Desktop/Health_App
git add -A
git commit -m "Build APK for testing"
git push
```

### 第 2 步：触发自动构建

1. 打开：https://github.com/Fantasze/health-app
2. 点击 **Actions** 标签
3. 点击 **Build Android APK** 工作流
4. 点击 **Run workflow**
5. 选择 `main` 分支
6. 点击 **Run workflow**

### 第 3 步：等待构建（10-15 分钟）

```
GitHub Actions 会：
1. 安装 Java
2. 安装 Android SDK
3. 编译 APK
4. 上传 APK 文件
```

### 第 4 步：下载 APK

1. 构建完成后，点击工作流
2. 找到 **Artifacts** 部分
3. 点击 `app-debug.apk` 下载
4. 分享给测试用户

---

## 方法 B：本地安装 Java（需要密码）

### 第 1 步：安装 Java

**选项 1：用 Homebrew（需要密码）**
```bash
brew install --cask temurin
```

**选项 2：手动下载安装**
1. 访问：https://adoptium.net/
2. 下载 macOS ARM64 JDK
3. 双击安装包
4. 按照提示安装

### 第 2 步：验证 Java

```bash
java -version
```

应该显示：
```
openjdk version "17.x.x"
```

### 第 3 步：生成 APK

```bash
cd /Users/rocket/Desktop/Health_App
npm run build
cd android
./gradlew assembleDebug
```

### 第 4 步：找到 APK 文件

```
/Users/rocket/Desktop/Health_App/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📱 分享 APK 给用户

### 方法 1：AirDrop（面对面）
```
1. 找到 APK 文件
2. 右键 → 分享 → AirDrop
3. 选择用户的 Android 手机
4. 用户接收并安装
```

### 方法 2：Google Drive / Dropbox
```
1. 上传 APK 到云盘
2. 生成分享链接
3. 发送链接给用户
4. 用户下载并安装
```

### 方法 3：Telegram / WhatsApp
```
1. 直接发送 APK 文件
2. 限制：文件不能超过 2GB
3. 用户接收并安装
```

---

## ⚠️ 用户安装时需要允许"未知来源"

### Android 10+：

```
1. 用户打开 APK 文件
2. 系统提示"未知来源"
3. 点击"设置"
4. 开启"允许来自此来源的应用"
5. 返回安装
```

### 提示用户：

```
📱 安装说明：

1. 下载 APK 文件
2. 打开文件
3. 如果提示"未知来源"：
   - 点击"设置"
   - 开启"允许来自此来源"
4. 点击"安装"
5. 完成！

⚠️ 这是测试版 App，来自可信来源。
```

---

## 🎯 推荐：用 GitHub Actions！

### 优点：
✅ 不用安装 Java
✅ 不用输入密码
✅ 自动构建
✅ 每次都有新 APK
✅ 可以分享给多人

### 缺点：
⏱️ 需要 10-15 分钟

---

## 🚀 现在行动！

### 选项 A：用 GitHub Actions（推荐）⭐⭐⭐
```
我帮你推送代码
你打开 Actions 页面
点击运行工作流
等 15 分钟下载 APK
```

### 选项 B：手动安装 Java
```
你自己安装 Java
然后告诉我
我帮你生成 APK
```

**选 A 还是 B？**
