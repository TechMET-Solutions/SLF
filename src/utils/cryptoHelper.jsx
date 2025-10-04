// src/utils/cryptoHelper.js
import CryptoJS from "crypto-js";

const secretKey = "MySuperSecretKey123"; // Must match backend

export const encryptData = (data) => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  } catch (e) {
    console.error("Encryption failed:", e);
    return null;
  }
};

export const decryptData = (cipher) => {
  if (!cipher) return null; // handle empty
  try {
    const bytes = CryptoJS.AES.decrypt(cipher, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedText) return null; // failed decryption
    return JSON.parse(decryptedText);
  } catch (error) {
    console.error("Decrypt error:", error);
    return null;
  }
};

