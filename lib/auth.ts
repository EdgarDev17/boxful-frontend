// utils/auth.ts
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
	id: string
	// otros campos que pueda tener tu token
}

export const getToken = () => {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('token')
	}
	return null
}

export const getUserId = () => {
	const token = getToken()
	if (token) {
		try {
			const decoded = jwtDecode(token) as DecodedToken
			return decoded.id
		} catch (error) {
			console.error('Error decodificando el token:', error)
			return null
		}
	}
	return null
}

// Configurar axios para incluir el token en todas las peticiones
export const setupAxiosInterceptors = () => {
	axios.interceptors.request.use(
		(config) => {
			const token = getToken()
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)
}
