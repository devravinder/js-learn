/* 
 Crypto:
  used for:-

    - Hashing (crypto.createHash)
    - HMAC generation Hash-based Message Authentication Codes) (crypto.createHmac)
    - Symmetric encryption & decryption (crypto.createCipheriv/crypto.createDecipheriv)
    - Password hashing with salt (crypto.pbkdf2Sync)
    - Random data generation (crypto.randomBytes)
    - Asymmetric encryption (RSA) (crypto.publicEncrypt/crypto.privateDecrypt) 
           RSA = Rivest–Shamir–Adleman ( named after the 3 inventors )

*/


const crypto = require('crypto');


// hashing data ( only encryption not decryption )
const ex1 = () => {

  // Create a hash
  const hash = crypto.createHash('sha256'); // Use 'sha256', 'sha512', etc.

  hash.update('Hello, World!'); // Input data to hash
  const result = hash.digest('hex'); // Get the hash as a hexadecimal string

  console.log('Hash:', result);

  //============

}

// Generating HMAC
const ex2 = () => {

  const secret = 'my-secret-key';
  const hmac = crypto.createHmac('sha256', secret);

  hmac.update('Hello, World!');
  const result = hmac.digest('hex');

  console.log('HMAC:', result);

}

// Symmetric Encrypting and Decrypting Data
// Symmetric encryption uses a shared secret key to encrypt and decrypt data.
const ex3 = () => {

  // Generate a random - key and initialization vector (IV)
  const key = crypto.randomBytes(32); // random 32 bytes buffer // 32 bytes for AES-256
  const iv = crypto.randomBytes(16);  // random 16 bytes buffer //16 bytes for AES



  /* 
   IV is optional
   The IV ensures that the same plaintext encrypted multiple times produces different ciphertexts,
   making the encryption more secure against certain types of attacks.
  
  */

  const CIPHER_ALGORITHEM = 'aes-256-cbc'

  const encrypt = (text) => {
    const cipher = crypto.createCipheriv(CIPHER_ALGORITHEM, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encrypted, ivHex: iv.toString('hex') };
  };

  const decrypt = (encrypted, ivHex) => {
    const decipher = crypto.createDecipheriv(CIPHER_ALGORITHEM, key, Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  };


  const text = 'Hello, Secure World!';
  const { encrypted, ivHex } = encrypt(text);
  console.log('Encrypted:', encrypted);

  const decrypted = decrypt(encrypted, ivHex);
  console.log('Decrypted:', decrypted);

}

// Password Hashing with Salt
const ex4 = () => {

  const password = 'mypassword';

   /* 
    while hasing, same result will come for the same salt with the same parameters
    - so salt is very important
   
   */


  const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
  const iterations = 1000
  const keyLungth = 64
  const algorithem = 'sha512' // Secure Hash Algorithm 512-bit
  const encodng = 'hex'

  // Hash the password with the salt
  const hashedPassword = crypto.pbkdf2Sync(password, salt, iterations, keyLungth, algorithem).toString(encodng);

  console.log('Salt:', salt);
  console.log('Hashed Password:', hashedPassword);



  const hashedPassword2 = crypto.pbkdf2Sync(password, salt, iterations, keyLungth, algorithem).toString(encodng);

  console.log('Hashed Password2:', hashedPassword2);

  console.log(hashedPassword === hashedPassword2) // true


}

// Generate Random Data
const ex5 = () => {
  // Generate a 16-byte random token
  const randomToken = crypto.randomBytes(16).toString('hex');

  console.log('Random Token:', randomToken);
}


// Asymmetric Encryption (RSA)
// Asymmetric encryption uses a public key for encryption and a private key for decryption.
const ex6 = () => {
  const crypto = require('crypto');

  // Generate key pair
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // Key size in bits
  });

  const message = 'Hello, Asymmetric World!';

  // Encrypt the message with the public key
  const encryptedMessage = crypto.publicEncrypt(publicKey, Buffer.from(message));
  console.log('Encrypted Message:', encryptedMessage.toString('base64'));

  // Decrypt the message with the private key
  const decryptedMessage = crypto.privateDecrypt(privateKey, encryptedMessage);
  console.log('Decrypted Message:', decryptedMessage.toString());

}

const start = () => {
  ex4()
}

start()