import CryptoJS from "crypto-js"

export function encrypt(message: string, key: string): string {
	return CryptoJS.AES.encrypt(message, key).toString()
}

export function decrypt(message: string, key: string): string {
	return CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8)
}
