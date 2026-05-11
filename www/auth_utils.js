// Firebase Authentication 工具函数
// 用于所有需要认证的页面

const auth = window.firebaseApp.auth;
const db = window.firebaseApp.db;

/**
 * 检查用户是否已登录
 * @returns {boolean} 是否已登录
 */
function isLoggedIn() {
    const session = localStorage.getItem('userSession');
    return session !== null;
}

/**
 * 获取当前用户 ID
 * @returns {string|null} 用户 ID
 */
function getCurrentUserId() {
    const session = JSON.parse(localStorage.getItem('userSession'));
    return session ? session.id : null;
}

/**
 * 强制要求登录，未登录则跳转
 */
function requireLogin() {
    if (!isLoggedIn()) {
        alert('请先登录');
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

/**
 * 注册新用户
 * @param {string} email - 邮箱
 * @param {string} password - 密码
 * @param {string} name - 姓名
 * @param {string} phone - 电话
 * @returns {Promise<Object>} 用户数据
 */
async function registerUser(email, password, name, phone) {
    try {
        // Firebase Auth 注册
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // 创建用户文档
        const userData = {
            id: user.uid,
            email: email,
            name: name,
            phone: phone,
            createdAt: new Date().toISOString(),
            isPremium: false
        };
        
        await db.collection('users').doc(user.uid).set(userData);
        
        // 保存 session
        localStorage.setItem('userSession', JSON.stringify(userData));
        
        return userData;
    } catch (error) {
        console.error('注册失败:', error);
        throw new Error(getAuthErrorMessage(error.code));
    }
}

/**
 * 用户登录
 * @param {string} email - 邮箱
 * @param {string} password - 密码
 * @returns {Promise<Object>} 用户数据
 */
async function loginUser(email, password) {
    try {
        // Firebase Auth 登录
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // 获取用户数据
        const userDoc = await db.collection('users').doc(user.uid).get();
        
        if (!userDoc.exists) {
            throw new Error('用户数据不存在');
        }
        
        const userData = { id: user.uid, ...userDoc.data() };
        
        // 保存 session
        localStorage.setItem('userSession', JSON.stringify(userData));
        
        return userData;
    } catch (error) {
        console.error('登录失败:', error);
        throw new Error(getAuthErrorMessage(error.code));
    }
}

/**
 * 用户登出
 */
function logoutUser() {
    auth.signOut().then(() => {
        localStorage.removeItem('userSession');
        window.location.href = 'index.html';
    }).catch(error => {
        console.error('登出失败:', error);
    });
}

/**
 * 等待 Firebase Auth 初始化完成
 * @returns {Promise<Object|null>} 当前 Firebase 用户
 */
function waitForAuthReady() {
    return new Promise(resolve => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        });
    });
}

/**
 * 管理员登录：必须是 Firebase Auth 用户，并且 admins/{uid} 文档存在
 */
async function loginAdmin(email, password) {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    const adminDoc = await db.collection('admins').doc(user.uid).get();

    if (!adminDoc.exists) {
        await auth.signOut();
        throw new Error('此账号不是管理员');
    }

    const adminData = {
        uid: user.uid,
        email: user.email,
        ...adminDoc.data(),
        loginTime: new Date().toISOString()
    };

    localStorage.setItem('adminSession', JSON.stringify(adminData));
    return adminData;
}

/**
 * 强制管理员权限；无权限则跳转管理员登录页
 */
async function requireAdmin() {
    const user = await waitForAuthReady();
    if (!user) {
        localStorage.removeItem('adminSession');
        window.location.href = 'admin_login.html';
        return false;
    }

    const adminDoc = await db.collection('admins').doc(user.uid).get();
    if (!adminDoc.exists) {
        localStorage.removeItem('adminSession');
        await auth.signOut();
        window.location.href = 'admin_login.html';
        return false;
    }

    localStorage.setItem('adminSession', JSON.stringify({
        uid: user.uid,
        email: user.email,
        ...adminDoc.data(),
        verifiedAt: new Date().toISOString()
    }));
    return true;
}

function logoutAdmin() {
    auth.signOut().finally(() => {
        localStorage.removeItem('adminSession');
        window.location.href = 'admin_login.html';
    });
}

/**
 * 教练登录
 * @param {string} coachId - 教练 ID
 * @param {string} phone - 电话
 * @returns {Promise<Object>} 教练数据
 */
async function loginCoach(coachId, phone) {
    try {
        // 查询教练
        const snapshot = await db.collection('coaches')
            .where('coachId', '==', coachId)
            .where('phone', '==', phone)
            .where('status', '==', 'approved')
            .limit(1)
            .get();
        
        if (snapshot.empty) {
            throw new Error('教练 ID 或电话号码不正确');
        }
        
        const doc = snapshot.docs[0];
        const coachData = { id: doc.id, ...doc.data() };
        
        // 更新最后登录时间
        await db.collection('coaches').doc(doc.id).update({
            lastLogin: new Date().toISOString()
        });
        
        // 保存 session
        localStorage.setItem('coachSession', JSON.stringify(coachData));
        
        return coachData;
    } catch (error) {
        console.error('教练登录失败:', error);
        throw error;
    }
}

/**
 * 获取认证错误信息
 * @param {string} errorCode - Firebase 错误码
 * @returns {string} 中文错误信息
 */
function getAuthErrorMessage(errorCode) {
    const messages = {
        'auth/email-already-in-use': '该邮箱已被注册',
        'auth/invalid-email': '邮箱格式不正确',
        'auth/operation-not-allowed': '邮箱注册未启用',
        'auth/weak-password': '密码太弱，请至少 6 位',
        'auth/user-disabled': '账号已被禁用',
        'auth/user-not-found': '账号不存在',
        'auth/wrong-password': '密码错误',
        'auth/invalid-credential': '账号或密码错误'
    };
    
    return messages[errorCode] || '操作失败，请稍后再试';
}

// 导出函数供其他页面使用
window.authUtils = {
    isLoggedIn,
    getCurrentUserId,
    requireLogin,
    registerUser,
    loginUser,
    logoutUser,
    waitForAuthReady,
    loginAdmin,
    requireAdmin,
    logoutAdmin,
    loginCoach,
    getAuthErrorMessage
};
