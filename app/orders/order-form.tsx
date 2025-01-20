'use client'

import { MapPin, Calendar } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { departments, municipalities } from '@/lib/location-data'
import { useState, useEffect, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'

interface CreateOrderProps {
	onSubmit: (data: any) => void
}

export function CreateOrder({ onSubmit }: CreateOrderProps) {
	const [selectedDepartment, setSelectedDepartment] = useState<string>('')
	const [dateValue, setDateValue] = useState('')
	const [formData, setFormData] = useState({
		pickup_adress: '',
		name: '',
		lastname: '',
		email: '',
		phone: '',
		destination_adress: '',
		department: '',
		municiopio: '',
		reference_point: '',
		delivery_instructions: '',
		// scheduledDate: '',
	})

	const [errors, setErrors] = useState<Record<string, string>>({})

	useEffect(() => {
		const today = new Date()
		setDateValue(today.toISOString().split('T')[0])
		setFormData((prev) => ({ ...prev, scheduledDate: today.toUTCString() }))
	}, [])

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedDate = new Date(e.target.value)
		const utcDate = selectedDate.toUTCString()
		setDateValue(e.target.value)
		setFormData((prev) => ({ ...prev, scheduledDate: utcDate }))
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(e.target)
		const newErrors: Record<string, string> = {}

		Object.entries(formData).forEach(([key, value]) => {
			if (!value) {
				newErrors[key] = 'Este campo es requerido'
			}
		})
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		onSubmit(formData)
	}

	return (
		<form onSubmit={handleSubmit} className='max-w-3xl mx-auto p-6'>
			<div className='space-y-2 mb-8'>
				<h1 className='text-2xl font-semibold text-gray-800'>Crea una orden</h1>
				<p className='text-gray-600'>
					Dale una ventaja competitiva a tu negocio con entregas{' '}
					<span className='font-medium'>el mismo día</span> (Área Metropolitana)
					y <span className='font-medium'>el día siguiente</span> a nivel
					nacional.
				</p>
			</div>

			<Card>
				<CardContent className='p-6'>
					<div className='space-y-6'>
						{/* Dirreccion de recoleccion y fecha*/}
						<div className='flex items-start gap-4 mb-6'>
							<div className='flex-1'>
								<div className='flex items-center gap-2 mb-2'>
									<MapPin className='h-4 w-4 text-gray-500' />
									<Label className='text-sm text-gray-600'>
										Dirección de recolección
									</Label>
								</div>
								<Input
									name='pickup_adress'
									value={formData.pickup_adress}
									onChange={handleInputChange}
									className='w-full'
									placeholder='Colonia Las Magnolias Calle ruta militar #1, San Miguel, San Miguel.'
								/>
								{errors.pickup_adress && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.pickup_adress}
									</p>
								)}
							</div>
							<div className='w-48'>
								<div className='flex items-center gap-2 mb-2'>
									<Calendar className='h-4 w-4 text-gray-500' />
									<Label
										htmlFor='scheduledDate'
										className='text-sm text-gray-600'>
										Fecha Programada
									</Label>
								</div>
								<Input
									id='scheduledDate'
									type='date'
									value={dateValue}
									onChange={handleDateChange}
									className='w-full'
								/>
							</div>
						</div>

						{/* Informacion personal */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8'>
							<div className='space-y-2'>
								<Label htmlFor='name' className='text-sm text-gray-600'>
									Nombres
								</Label>
								<Input
									id='name'
									name='name'
									value={formData.name}
									onChange={handleInputChange}
									placeholder='Ingrese nombres'
								/>
								{errors.name && (
									<p className='text-red-500 text-sm mt-1'>{errors.name}</p>
								)}
							</div>
							<div className='space-y-2'>
								<Label htmlFor='lastname' className='text-sm text-gray-600'>
									Apellidos
								</Label>
								<Input
									id='lastname'
									name='lastname'
									value={formData.lastname}
									onChange={handleInputChange}
									placeholder='Ingrese apellidos'
								/>
								{errors.lastname && (
									<p className='text-red-500 text-sm mt-1'>{errors.lastname}</p>
								)}
							</div>
							<div className='space-y-2'>
								<Label htmlFor='email' className='text-sm text-gray-600'>
									Correo Electrónico
								</Label>
								<Input
									id='email'
									name='email'
									value={formData.email}
									onChange={handleInputChange}
									type='email'
									placeholder='correo@ejemplo.com'
								/>
								{errors.email && (
									<p className='text-red-500 text-sm mt-1'>{errors.email}</p>
								)}
							</div>
							<div className='space-y-2'>
								<Label htmlFor='phone' className='text-sm text-gray-600'>
									Teléfono
								</Label>
								<div className='flex'>
									<div className='flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50'>
										<span className='text-sm text-gray-500'>+503</span>
									</div>
									<Input
										id='phone'
										name='phone'
										value={formData.phone}
										onChange={handleInputChange}
										className='rounded-l-none'
										placeholder='0000 0000'
									/>
								</div>
								{errors.phone && (
									<p className='text-red-500 text-sm mt-1'>{errors.phone}</p>
								)}
							</div>
							<div className='space-y-2 col-span-2'>
								<Label
									htmlFor='destination_adress'
									className='text-sm text-gray-600'>
									Dirección del destinatario
								</Label>
								<Input
									id='destination_adress'
									name='destination_adress'
									value={formData.destination_adress}
									onChange={handleInputChange}
									placeholder='Ingrese la dirección de entrega'
								/>
								{errors.destination_adress && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.destination_adress}
									</p>
								)}
							</div>
						</div>

						{/* Informacion del envio */}
						<div className='space-y-4'>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='department' className='text-sm text-gray-600'>
										Departamento
									</Label>
									<Select
										onValueChange={(value) => {
											setSelectedDepartment(value)
											setFormData((prev) => ({ ...prev, department: value }))
										}}>
										<SelectTrigger>
											<SelectValue placeholder='Seleccione departamento' />
										</SelectTrigger>
										<SelectContent>
											{departments.map((dept) => (
												<SelectItem key={dept.id} value={dept.name}>
													{dept.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									{errors.department && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.department}
										</p>
									)}
								</div>

								<div className='space-y-2'>
									<Label htmlFor='municiopio' className='text-sm text-gray-600'>
										Municipio
									</Label>
									<Select
										disabled={!selectedDepartment}
										onValueChange={(value) =>
											setFormData((prev) => ({ ...prev, municiopio: value }))
										}>
										<SelectTrigger>
											<SelectValue placeholder='Seleccione municipio' />
										</SelectTrigger>
										<SelectContent>
											{selectedDepartment &&
												municipalities[selectedDepartment]?.map((muni) => (
													<SelectItem key={muni} value={muni}>
														{muni}
													</SelectItem>
												))}
										</SelectContent>
									</Select>
									{errors.municiopio && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.municiopio}
										</p>
									)}
								</div>

								<div className='space-y-2'>
									<Label htmlFor='reference' className='text-sm text-gray-600'>
										Punto de referencia
									</Label>
									<Input
										id='reference_point'
										name='reference_point'
										value={formData.reference_point}
										onChange={handleInputChange}
										placeholder='Ingrese un punto de referencia cercano'
									/>
									{errors.reference_point && (
										<p className='text-red-500 text-sm mt-1'>
											{errors.reference_point}
										</p>
									)}
								</div>
							</div>

							<div className='space-y-2'>
								<Label
									htmlFor='delivery_instructions'
									className='text-sm text-gray-600'>
									Indicaciones de entrega
								</Label>
								<Textarea
									id='delivery_instructions'
									name='delivery_instructions'
									value={formData.delivery_instructions}
									onChange={handleInputChange}
									placeholder='Ingrese indicaciones adicionales para la entrega'
									className='min-h-[100px]'
								/>
								{errors.delivery_instructions && (
									<p className='text-red-500 text-sm mt-1'>
										{errors.delivery_instructions}
									</p>
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<Button type='submit' className='mt-6 w-full'>
				Siguiente
			</Button>
		</form>
	)
}
