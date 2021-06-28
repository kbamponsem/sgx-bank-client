import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto'
import axios from 'axios'
import { strict } from 'assert'
const NodeRSA = require("node-rsa")

export const get_enc_pub_key = async () => {
    let results = new Promise((resolve, reject) => {
        axios.get("https://localhost:7778/get-enclave-pub-keys").then(({ data }) => resolve(data)).catch(e => reject(e))
    })
    return results
}
export const createAccount = async (data) => {
    let results = new Promise((resolve, reject) => {
        axios.post("https://localhost:7778/create-account", JSON.stringify(data)).then(({ data }) => {
            resolve(data)
        }).catch(err => reject(err))

    })

    return results
}

export const login = async (data) => {
    console.log(data)
    let results = new Promise((resolve, reject) => {
        axios.post("https://localhost:7778/login", JSON.stringify(data)).then(({ data }) => resolve(data)).catch(e => reject(e))
    })

    return results
}

export const getBalance = async (data) => {
    let results = new Promise((resolve, reject) => {
        axios.post("https://localhost:7778/get-balance", JSON.stringify(data)).then(({ data }) => resolve(data)).catch(e => reject(e))
    })
    return results
}


const key = randomBytes(32)
const algorithm = 'aes-256-gcm'
const iv = randomBytes(16)

export const getSymmetricKey = async () => {
    const data = await get_enc_pub_key()

    const enclave1PubKey = new NodeRSA(data.enclave1_pub_key)
    const enclave2PubKey = new NodeRSA(data.enclave2_pub_key)

    const enclave1 = enclave1PubKey.encrypt("hello_world", 'base64').toString()
    const enclave2 = enclave2PubKey.encrypt("hi", 'base64').toString()

    console.log({enclave1, enclave2})
    return { enclave1, enclave2 }
};
export const getSymmetricIV = () => iv;

export const sendIdAndSymmetricKey = async (data) => {
    let result = new Promise((resolve, reject) => {
        axios.post("https://localhost:7778/id-and-symmetric-key", JSON.stringify(data)).then(({ data }) => resolve(data)).catch(e => reject(e))
    })

    return result
}

export const logout = async (data) => {
    let result = new Promise((resolve, reject) => {
        axios.post("https://localhost:7778/logout", JSON.stringify(data)).then(data => resolve(data)).catch(e => reject(e))
    })

    return result
}
export const hash = (utf8String) => {
    const hash = createHash("sha256")
    hash.update(utf8String)
    return hash.digest('hex')
}

export const encrypt = (utf8String) => {
    const cipher = createCipheriv(algorithm, Buffer.from(key), iv)
    let encryptedData = cipher.update(utf8String, 'utf8', 'hex')
    encryptedData += cipher.final('hex')
    return encryptedData
}

export const decrypt = (hexString) => {
    const decipher = createDecipheriv(algorithm, Buffer.from(key), iv)
    let decryptedData = decipher.update(hexString, 'hex', 'utf8')
    return decryptedData
}

export const makeRandomString = (length) => {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength))
    }
    return result
}