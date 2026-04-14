# 🚀 Health App - 快速部署指南

## 📱 这是什么？

一个完整的健康管理 App，包含：
- ✅ BMI、FFMI 计算
- ✅ 卡路里追踪
- ✅ AI 食物识别（相机拍照）
- ✅ 个性化饮食/运动建议
- ✅ 数据本地存储（无需服务器）

---

## 🛠️ 部署步骤

### 方法 A：GitHub Actions 自动构建（推荐）⭐

**1. 创建 GitHub 仓库**
```
1. 访问 https://github.com/new
2. 仓库名：health-app
3. 设为 Public 或 Private
4. 不要初始化（不要加 README/.gitignore）
5. 点击"Create repository"
```

**2. 推送代码**
```bash
cd /Users/rocket/Desktop/Health_App

# 替换 YOUR_USERNAME 为你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/health-app.git
git branch -M main
git push -u origin main
```

**3. 等待自动构建**
```
1. 推送后 GitHub Actions 会自动开始
2. 访问：https://github.com/YOUR_USERNAME/health-app/actions
3. 约 5-10 分钟完成
4. 点击最新的 build → 下载 app-debug.apk
```

**4. 安装到 BlueStacks**
```
1. 下载 BlueStacks: https://www.bluestacks.com
2. 安装并打开 BlueStacks
3. 把 APK 拖进 BlueStacks 窗口
4. 打开"健康管家"App
```

---

### 方法 B：本地构建（需要 Java）

**前提条件：**
- Java 17+ (`brew install --cask zulu`)
- Android Studio（可选）

**构建命令：**
```bash
cd /Users/rocket/Desktop/Health_App
npx cap sync android
cd android
./gradlew assembleDebug
```

**APK 位置：**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📲 测试功能

### BlueStacks 设置
1. **相机权限**：BlueStacks 会自动映射电脑摄像头
2. **存储权限**：已配置，无需额外设置
3. **位置**：如需测试，可在 BlueStacks 设置虚拟位置

### 测试流程
1. **首次启动** → 填写身体数据（引导页面）
2. **首页** → 查看今日总结、AI 食物识别
3. **档案页** → 查看 BMI/FFMI、修改数据
4. **营养页** → 查看营养目标、进度条

### AI 食物识别测试
1. 点击首页相机按钮 📷
2. 拍照或选择图片
3. AI 会识别食物并计算卡路里
4. 点击"添加到今日记录"

> **注意**：当前使用模拟数据演示，需要接入真实 AI API（如 CalorieMama）才能实际识别

---

## 🔧 自定义配置

### 修改 App 名称
编辑 `capacitor.config.json`：
```json
{
  "appId": "com.healthapp.app",
  "appName": "你的 App 名称"
}
```

### 修改主题色
编辑 `www/index.html`，找到 CSS 变量：
```css
:root {
    --primary: #4CAF50;      /* 主色调 */
    --secondary: #FF9800;    /* 辅助色 */
    --danger: #f44336;       /* 警告色 */
}
```

### 接入真实 AI API
编辑 `www/index.html` 中的 `analyzeFoodWithAI()` 函数，替换为：
- CalorieMama API
- 自定义后端
- TensorFlow.js 本地识别

---

## 📦 发布正式版本

**1. 签名 APK**
```bash
cd android
./gradlew assembleRelease
```

**2. 上传到应用商店**
- Google Play Store
- Apple App Store（需要 iOS 构建）
- 第三方商店（APKPure 等）

---

## ❓ 常见问题

### Q: GitHub Actions 构建失败？
A: 检查 `.github/workflows/build-android.yml` 配置，确保 Node.js 和 Java 版本正确

### Q: BlueStacks 无法安装？
A: 确保 APK 文件完整，尝试重启 BlueStacks

### Q: 相机无法使用？
A: BlueStacks 设置 → 系统 → 相机，确保已启用

### Q: 数据会丢失吗？
A: 数据存储在本地 localStorage，卸载 App 会清空数据

---

## 📞 需要帮助？

有问题随时问我！🚀
