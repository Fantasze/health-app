// Firebase 配置 - Health App Malaysia
// 创建日期：2026-04-16

const firebaseConfig = {
  apiKey: "AIzaSyAviANAkM4u6phDWVdxN0SL2pTPN7meWCA",
  authDomain: "health-app-malaysia.firebaseapp.com",
  projectId: "health-app-malaysia",
  storageBucket: "health-app-malaysia.firebasestorage.app",
  messagingSenderId: "922823756112",
  appId: "1:922823756112:web:d6ff2237c08c3ae1ae8455",
  measurementId: "G-VV4LKRZVNV"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);

// 初始化服务（不需要 Analytics）
const auth = firebase.auth();
const db = firebase.firestore();

// 导出供其他文件使用
window.firebaseApp = {
  firebase: firebase,
  auth: auth,
  db: db,
  initialized: true
};

console.log('✅ Firebase 已初始化 - Health App Malaysia');
