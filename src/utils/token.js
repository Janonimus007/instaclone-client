import { jwtDecode } from "jwt-decode";
import { TOKEN } from "./contants"

export function setToken(token) {
    localStorage.setItem(TOKEN, token)
}


export function getToken() {
    return localStorage.getItem(TOKEN)
}

export function decodeToken(token) {
    const tokenDecodificado = jwtDecode(token)
    console.log('Este es el token decodificado:::', tokenDecodificado);
    return tokenDecodificado
}