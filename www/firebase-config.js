// Firebase 配置 - Health App Malaysia
// 创建日期：2026-04-16
// 更新：添加 Cloud Firestore 支持

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

// 初始化服务
const auth = firebase.auth();
const db = firebase.firestore();

// 导出供其他文件使用
window.firebaseApp = {
  firebase: firebase,
  auth: auth,
  db: db,
  initialized: true
};

// 全局辅助函数
window.dbHelpers = {
  // 保存数据
  async save(collection, data) {
    const docRef = await db.collection(collection).add(data);
    return docRef.id;
  },
  
  // 更新数据
  async update(collection, id, data) {
    await db.collection(collection).doc(id).update(data);
  },
  
  // 查询数据
  async query(collection, field, operator, value) {
    const snapshot = await db.collection(collection)
      .where(field, operator, value)
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  
  // 实时监听
  onSnapshot(collection, callback) {
    return db.collection(collection).onSnapshot(callback);
  },
  
  // 删除数据
  async delete(collection, id) {
    await db.collection(collection).doc(id).delete();
  }
};

console.log('✅ Firebase 已初始化 - Health App Malaysia');
console.log('🔥 Firestore 已启用 - 支持实时同步');
