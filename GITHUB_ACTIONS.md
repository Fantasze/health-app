# 📱 健康管家 - GitHub Actions 自动构建指南

## ✅ 配置完成！

GitHub Actions 工作流已创建，现在可以自动构建 APK！

---

## 🚀 使用步骤

### 第 1 步：创建 GitHub 仓库

**在 GitHub.com：**

1. 登录你的 GitHub 账号
2. 点击右上角 "+" → "New repository"
3. 仓库名：`health-app`（或其他）
4. 设为 **Public** 或 **Private**（建议 Private）
5. 不要初始化（不要勾选 README/.gitignore）
6. 点击 "Create repository"

---

### 第 2 步：推送代码到 GitHub

**在终端运行：**

```bash
cd /Users/rocket/Desktop/Health_App

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Health App"

# 替换 YOUR_USERNAME 为你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/health-app.git

# 推送到 GitHub
git push -u origin main
```

**如果提示分支名不对：**
```bash
git branch -M main
git push -u origin main
```

---

### 第 3 步：自动构建 APK

**推送到 GitHub 后：**

1. 访问你的仓库页面
2. 点击 "Actions" 标签
3. 看到 "Build Android APK" 工作流
4. 自动开始运行（绿色进度条）
5. 等待 5-10 分钟

---

### 第 4 步：下载 APK

**构建完成后：**

**方法 A：从 Actions 下载**
```
1. 点击 "Actions" 标签
2. 点击刚完成的构建（最上面那个）
3. 滚动到底部 "Artifacts"
4. 点击 "app-debug" 下载
5. 解压得到 app-debug.apk
```

**方法 B：从 Release 下载（如果打了 tag）**
```
1. 打标签：git tag v1.0.0
2. 推送标签：git push origin v1.0.0
3. 自动创建 Release
4. 在 Releases 页面下载 APK
```

---

## 📋 手动触发构建

**随时可以重新构建：**

1. 访问仓库 → Actions
2. 左侧选择 "Build Android APK"
3. 点击右上角 "Run workflow"
4. 选择分支（main）
5. 点击 "Run workflow"

---

## 🎯 构建的文件

**输出位置：**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

**APK 信息：**
- 大小：约 20-30 MB
- 类型：Debug（可测试用）
- 签名：自动签名（测试用）

---

## 📱 安装到手机

**下载 APK 后：**

1. 发送 APK 到手机（微信/邮件/USB）
2. 手机设置 → 安全 → 允许未知来源
3. 点击 APK 安装
4. 完成！

---

## 🔧 常见问题

### Q1: 构建失败？
```
检查：
1. GitHub Actions 是否启用
2. package.json 是否正确
3. android 文件夹是否完整

解决：
1. Settings → Actions → General → Allow all actions
2. 重新推送代码
```

### Q2: 构建太慢？
```
正常需要 5-10 分钟
首次更久（下载依赖）
```

### Q3: APK 无法安装？
```
1. 手机设置 → 安全 → 允许未知来源
2. 确保是 Debug APK
3. 重新下载
```

### Q4: 想要 Release 版本？
```bash
# 打标签
git tag v1.0.0
git push origin v1.0.0

# 自动构建 Release 版本
```

---

## 💡 进阶：构建 Release 签名版

**需要签名文件：**

1. 生成签名密钥（本地）：
```bash
keytool -genkey -v -keystore health-app.keystore -alias health-app -keyalg RSA -keysize 2048 -validity 10000
```

2. 上传到 GitHub Secrets：
   - Settings → Secrets and variables → Actions
   - 添加：
     - KEYSTORE_BASE64（keystore 文件 base64）
     - KEYSTORE_PASSWORD
     - KEY_ALIAS
     - KEY_PASSWORD

3. 修改 build-android.yml 添加签名

---

## 📊 构建历史

**查看所有构建：**
```
GitHub 仓库 → Actions → 点击工作流
```

**下载旧版本 APK：**
```
点击旧构建 → Artifacts → 下载
```

---

## 🎉 完成！

现在每次推送代码都会自动构建 APK！

**常用命令：**
```bash
# 修改代码后
git add .
git commit -m "修改内容"
git push

# 自动触发构建！
```

---

**现在去创建 GitHub 仓库并推送代码吧！** 🚀
