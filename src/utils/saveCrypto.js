// src/utils/saveCrypto.js

import CryptoJS from 'crypto-js';

// This is our secret key. 
// As long as the students don't know this exact string, they can't edit their saves!
const SECRET_KEY = 'c4t4ly5t_s3cr3t_k3y_2026';

export const encryptSaveData = (data) => {
  try {
    // 1. Turn our data object into a normal text string
    const jsonString = JSON.stringify(data);
    
    // 2. Lock it up using our secret key, and return the scrambled text
    return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
  } catch (error) {
    console.error("Failed to encrypt save data:", error);
    return null;
  }
};

export const decryptSaveData = (ciphertext) => {
  try {
    // Be gentle to old saves: If the file starts with '{', it's an old, unencrypted save file.
    // We will let them load it normally this one time. When the game auto-saves next, it will be encrypted!
    if (ciphertext.startsWith('{')) {
      return JSON.parse(ciphertext);
    }

    // 1. Unlock the scrambled text using our secret key
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    
    // 2. Turn the decrypted bytes back into a readable string
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    // If a student tampered with the scrambled letters, the decryption will fail and result in an empty string.
    if (!decryptedString) {
      throw new Error("Decryption failed. Save file may have been tampered with.");
    }

    // 3. Turn the readable string back into our game data object
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error("Failed to decrypt save data:", error);
    return null; // Return null so the game knows this file is invalid
  }
};