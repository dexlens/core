import crypto from 'node:crypto';
import { Buffer } from 'node:buffer';

/********************************************************************************
 * Utility for password-based string encryption and decryption using AES-256-GCM
 *********************************************************************************/

const ALGORITHM = 'aes-256-gcm'; // AES-256-GCM is a symmetric encryption algorithm
const SALT_LENGTH = 32; // 256 bits
const IV_LENGTH = 12; // 96 bits
const KEY_LENGTH = 32; // 256 bits
const AUTH_TAG_LENGTH = 16; // 128 bits
const ITERATIONS = 100000;

/********************************************************************************
 * Derives an encryption key from a password using PBKDF2
 *********************************************************************************/

function deriveKey(password: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    'sha256'
  );
}

/********************************************************************************
 * Encrypts a string using a password
 *********************************************************************************/

export function encrypt(plaintext: string, password: string): string {
  // Generate random salt and IV
  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);
  
  // Derive key from password
  const key = deriveKey(password, salt);
  
  // Create cipher
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  // Encrypt the plaintext
  const encryptedBuffer = Buffer.concat([
    cipher.update(plaintext, 'utf8'),
    cipher.final()
  ]);
  
  // Get the authentication tag
  const authTag = cipher.getAuthTag();
  
  // Combine salt, IV, authTag, and encrypted data
  const combined = Buffer.concat([
    salt,
    iv,
    authTag,
    encryptedBuffer
  ]);
  
  // Return as base64 string
  return combined.toString('base64');
}

/********************************************************************************
 * Decrypts a previously encrypted string using the same password
 * Author: Liquid
 * Todo: 
 * - Add error handling
 *********************************************************************************/

export function decrypt(ciphertext: string, password: string): string {
  try {
    // Convert base64 to Buffer
    const combined = Buffer.from(ciphertext, 'base64');
    
    // Extract salt, IV, authTag, and encrypted data
    const salt = combined.subarray(0, SALT_LENGTH);
    const iv = combined.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const authTag = combined.subarray(
      SALT_LENGTH + IV_LENGTH,
      SALT_LENGTH + IV_LENGTH + AUTH_TAG_LENGTH
    );
    const encryptedData = combined.subarray(SALT_LENGTH + IV_LENGTH + AUTH_TAG_LENGTH);
    
    // Derive the same key from password
    const key = deriveKey(password, salt);
    
    // Create decipher
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    // Decrypt the data
    const decrypted = Buffer.concat([
      decipher.update(encryptedData),
      decipher.final()
    ]);
    
    return decrypted.toString('utf8');
  } catch (error) {
    throw new Error('Decryption failed. Invalid password or corrupted data.');
  }
}

/********************************************************************************
 * Helper function to check if the encryption/decryption works
 *********************************************************************************/

export function testEncryption(plaintext: string, password: string): boolean {
  try {
    const encrypted = encrypt(plaintext, password);
    const decrypted = decrypt(encrypted, password);
    return plaintext === decrypted;
  } catch (error) {
    console.error('Encryption test failed:', error);
    return false;
  }
}