import { createCipheriv, createDecipheriv, createHash, createPublicKey, publicEncrypt, randomBytes } from 'crypto'
import axios from 'axios';

export const get_enc_pub_key = async () => {
    let results: Promise<string> = new Promise((resolve, reject) => {
        axios.get("https://localhost:7778/get-enclave1-pub-key").then(({ data }) => resolve(data.enclave_pub_key)).catch(e => console.log)
    })
    return results
}
export const createAccount = async (data: { username: string, password: string }) => {

    protocolTest()

    let results;
    await axios.post("https://localhost:7778/create-account", JSON.stringify(data)).then(({ data }) => {
        results = data;
    }).catch(err => console.log(err));

    return results;
}
const key = randomBytes(32)
const algorithm = 'aes-256-gcm'
const iv = randomBytes(16)


export const protocolTest = async () => {
    let enclavePubKey: string = await get_enc_pub_key()

    console.log(enclavePubKey.toString(), typeof (enclavePubKey))

    publicEncrypt(createPublicKey(enclavePubKey), Buffer.from('Hello'))

}

export const hash = (utf8String: string) => {
    const hash = createHash("sha256")
    hash.update(utf8String)
    return hash.digest('hex')
}

export const encrypt = (utf8String: string) => {
    const cipher = createCipheriv(algorithm, Buffer.from(key), iv)
    let encryptedData = cipher.update(utf8String, 'utf8', 'hex')
    encryptedData += cipher.final('hex')
    return encryptedData
}

export const decrypt = (hexString: string) => {
    const decipher = createDecipheriv(algorithm, Buffer.from(key), iv)
    let decryptedData = decipher.update(hexString, 'hex', 'utf8')
    return decryptedData
}

export const makeRandomString = (length: number) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}