const cache = require("./CacheMemoryService");
const crypto = require("crypto");
const fs = require("fs");
const uuid = require("uuid");
const iv = "2624750004598718";

//执行RSA加密会得到一个类似这样的错误：data too large for key size，
//这是因为RSA加密的原始信息必须小于Key的长度。那如何用RSA加密一个很长的消息呢？
//实际上，RSA并不适合加密大数据，而是先生成一个随机的AES密码，用AES加密原始信息，
//然后用RSA加密AES口令，这样，实际使用RSA时，给对方传的密文分两部分，一部分是AES加密的密文，
//另一部分是RSA加密的AES口令。对方用RSA先解密出AES口令，再用AES解密密文，即可获得明文

/**
 * 加密方法
 * @param key 加密key
 * @param iv       向量
 * @param data     需要加密的数据
 * @returns string
 */
let encryptByAes = function(key, iv, data) {
  let cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  let crypted = cipher.update(data, "utf8", "binary");
  crypted += cipher.final("binary");
  crypted = new Buffer(crypted, "binary").toString("base64");
  return crypted;
};

/**
 * 解密方法
 * @param key      解密的key
 * @param iv       向量
 * @param crypted  密文
 * @returns string
 */
let decryptByAes = function(key, iv, crypted) {
  crypted = new Buffer(crypted, "base64").toString("binary");
  let decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  let decoded = decipher.update(crypted, "binary", "utf8");
  decoded += decipher.final("utf8");
  return decoded;
};

/**
 * 加密
 * @param {String} str
 */
let encrypt = str => {
  let key = "751f621ea5c8f930";
  let publicKey = fs
    .readFileSync("./server/session_keys/rsa_public_key.pem")
    .toString("ascii");
  // 公钥加密key
  let encodeDataKey = crypto
    .publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING //
      },
      Buffer.from(key)
    )
    .toString("base64");
  // aes方式使用key加密内容
  let encodeData = encryptByAes(key, iv, str);

  console.log("encode: ", encodeData);
  return encodeDataKey + "," + encodeData;
};

/**
 * 解密
 * @param {String} str
 */
const decrypt = str => {
  if (!str || !str.length) return null;
  let sIndex = str.indexOf(",");
  let encodeDataKey = str.substring(0, sIndex);
  let encodeData = str.substring(sIndex + 1);
  let privateKey = fs
    .readFileSync("./server/session_keys/rsa_private_key.pem")
    .toString("ascii");
  let buffer2 = new Buffer(encodeDataKey, "base64");
  let decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING //
    },
    buffer2
  );
  let key = decrypted.toString("utf8");
  console.log(key);
  let re = decryptByAes(key, iv, encodeData);

  return re;
};
const getTokenObj = token => {
  let u = cache.get(token);
  if (!u) {
    u = decrypt(token);
    cache.set(token, u, 1000 * 60 * 60); // 缓存1个小时
  }
  return u;
};
const delToken = token => {
  cache.del(token);
};
const startSession = (deviceId, userId) => {
  let d = {
    _id: uuid.v1(),
    creator: userId,
    createTime: new Date().getTime(),
    deviceId
  };
  d.sessionFullStr = encrypt(JSON.stringify(d));
  console.log("encode: ", d.sessionFullStr);
  return d;
};
module.exports = {
  encrypt,
  decrypt,
  getTokenObj,
  delToken,
  startSession
};
