import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'; // ✅ ใช้แบบนี้ ไม่ต้องแก้ tsconfig

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private secretKey = 'p3s6v8y/B?E(H+Mb'; // คีย์ต้องยาว 16, 24 หรือ 32 bytes

  constructor() {}

  encrypt(plainText: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.secretKey);
    const encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(plainText),
      key,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return encrypted.toString();
  }

  decrypt(cipherText: string): string {
    const key = CryptoJS.enc.Utf8.parse(this.secretKey);
    const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
