'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default function SignUp() {
	return (
		<>
			<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
				Crear un cuenta
			</h2>
			<form
				className='mt-8 space-y-6'
				action={'http://localhost:8080/auth/signup'}
				method='POST'>
				<div className='rounded-md shadow-sm space-y-3'>
					<div>
						<Label htmlFor='name' className='font-semibold'>
							Nombres
						</Label>
						<Input
							id='name'
							name='name'
							type='text'
							autoComplete='name'
							required
							className='rounded-t-md'
						/>
					</div>
					<div>
						<Label htmlFor='lastname' className='font-semibold'>
							Apellidos
						</Label>
						<Input
							id='lastname'
							name='lastname'
							type='text'
							autoComplete='lastname'
							required
							className='rounded-t-md'
						/>
					</div>
					<div>
						<Label htmlFor='email' className='font-semibold'>
							Correo
						</Label>
						<Input
							id='email-address'
							name='email'
							type='email'
							autoComplete='email'
							required
						/>
					</div>
					<div>
						<Label htmlFor='password' className='font-semibold'>
							Contraseña
						</Label>
						<Input
							id='password'
							name='password'
							type='password'
							autoComplete='new-password'
							required
							className='rounded-b-md'
						/>
					</div>
				</div>
				<div>
					<Select>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Pais' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='El Salvador'>El Salvador</SelectItem>
							<SelectItem value='Guatemala'>Guatemala</SelectItem>
							<SelectItem value='Honduras'>Honduras</SelectItem>
							<SelectItem value='Nicaragua'>Nicaragua</SelectItem>
							<SelectItem value='Costa Rica'>Costa Rica</SelectItem>
							<SelectItem value='Panama'>Panamá</SelectItem>
							<SelectItem value='Belize'>Belice</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Button type='submit' className='w-full'>
						Crear cuenta
					</Button>
				</div>
			</form>
			<div className='mt-4 text-center space-x-1'>
				<p className='text-sm text-gray-600'>
					¿Ya posees una cuenta?
					<Link
						href='/signin'
						className='font-medium text-blue-600 hover:text-blue-500'>
						Iniciar sesión
					</Link>
				</p>
			</div>
		</>
	)
}
