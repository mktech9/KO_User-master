const CryptoJS = require("crypto-js");

function encrypt(message, secretKey) {
  const encryptedMessage = CryptoJS.AES.encrypt(message, secretKey).toString();
  return encryptedMessage;
}

function decrypt(encryptedMessage, secretKey) {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
  const decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedMessage;
}

export { encrypt, decrypt };
