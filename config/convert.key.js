const fs = require('fs');
const path = require('path');

/**
 * 读取密钥文件
 */
const privateKey = fs.readFileSync(path.join('config', 'private.key'));
const publicKey = fs.readFileSync(path.join('config', 'public.key'));


/**
 * 转换为 Base64 格式
 */
const privateKeyBase64 = Buffer.from(privateKey).toString('base64');
const publicKeyBase64 = Buffer.from(publicKey).toString('base64');


/**
 * 转换输出结果
 */
console.log(`privateKeyBase64: ${privateKeyBase64}`);
console.log(`publicKeyBase64: ${publicKeyBase64}`);