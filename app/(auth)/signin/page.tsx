'use client'
import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export default function SignIn() {
	const router = useRouter()
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')
		setIsLoading(true)

		try {
			const response = await axios.post(
				'http://localhost:8080/auth/signin',
				formData
			)

			console.log(response)
			// Guardamos el token en localStorage
			localStorage.setItem('token', response.data.access_token)
			router.push('/orders')
		} catch (err) {
			console.log(err)
			setError('Error al iniciar sesión')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
				Iniciar Sesión
			</h2>

			{error && (
				<div className='mt-4 p-3 bg-red-100 text-red-700 rounded-md'>
					{error}
				</div>
			)}

			<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
				<div className='rounded-md shadow-sm space-y-3'>
					<div>
						<Label htmlFor='email-address' className='sr-only'>
							Correo Electronico
						</Label>
						<Input
							id='email-address'
							name='email'
							type='email'
							autoComplete='email'
							required
							className='rounded-t-md'
							placeholder='Email address'
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div>
						<Label htmlFor='password' className='sr-only'>
							Contraseña
						</Label>
						<Input
							id='password'
							name='password'
							type='password'
							autoComplete='current-password'
							required
							className='rounded-b-md'
							placeholder='Password'
							value={formData.password}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div>
					<Button type='submit' className='w-full' disabled={isLoading}>
						{isLoading ? 'Cargando...' : 'Iniciar Sesión'}
					</Button>
				</div>
			</form>

			<div className='mt-4 text-center'>
				<p className='text-sm text-gray-600'>
					¿No tienes una cuenta?{' '}
					<Link
						href='/signup'
						className='font-medium text-blue-600 hover:text-blue-500'>
						Crear Cuenta
					</Link>
				</p>
			</div>
		</>
	)
}
