import {encrypt, decrypt} from "./index"

const message: string = "this is a message"
const key: string = "the key"

const encrypted = encrypt(message, key)
console.log(encrypted)
console.log(decrypt(encrypted, key))
