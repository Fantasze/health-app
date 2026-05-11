#!/bin/bash

# 健康管家 App - Firebase 部署脚本
# 使用方式：./deploy.sh

echo "🚀 健康管家 App - Firebase 部署"
echo "================================"
echo ""

# 检查 Firebase CLI
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI 未安装"
    echo ""
    echo "请先安装 Firebase CLI:"
    echo "  npm install -g firebase-tools"
    echo ""
    exit 1
fi

echo "✅ Firebase CLI 已安装"
firebase --version
echo ""

# 检查是否已登录
echo "🔐 检查登录状态..."
if ! firebase login:list &> /dev/null; then
    echo "⚠️  未登录 Firebase"
    echo ""
    echo "正在登录..."
    firebase login
fi

echo "✅ 已登录 Firebase"
echo ""

# 部署 Firestore 规则
echo "📋 部署 Firestore 规则..."
firebase deploy --only firestore:rules

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Firestore 规则部署成功！"
    echo ""
    echo "📊 下一步:"
    echo "  1. 打开 Firebase 控制台"
    echo "  2. 前往 Authentication"
    echo "  3. 启用 Email/Password 登录"
    echo ""
    echo "🔗 Firebase 控制台:"
    echo "  https://console.firebase.google.com/project/health-app-malaysia"
else
    echo ""
    echo "❌ 部署失败，请检查错误信息"
    exit 1
fi
