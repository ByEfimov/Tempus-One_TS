import CryptoJS from 'crypto-js';

const myKey = import.meta.env.VITE_TEMPUS_CRIPTO_KEY;

export function encryptData(data: string | undefined | null) {
  if (data) {
    const encrypted = CryptoJS.AES.encrypt(data, myKey).toString();
    return btoa(encrypted);
  } else {
    return '';
  }
}

export function decryptData(encryptedData: string | undefined | null) {
  if (encryptedData) {
    const decoded = atob(encryptedData);
    const bytes = CryptoJS.AES.decrypt(decoded, myKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } else {
    return '';
  }
}
