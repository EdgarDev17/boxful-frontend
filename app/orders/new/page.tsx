'use client'
import React, { useState, useEffect } from 'react'
import { CreateOrder } from '../order-form'
import { PackageForm } from '../package-form'
import { Button } from '@/components/ui/button'
import { OrderReview } from '../review'
import axios from 'axios'
import { toast } from 'sonner'
import { getUserId, setupAxiosInterceptors } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export interface Package {
	id: string
	length: string
	height: string
	width: string
	weight: string
	content: string
}

export interface Order {
	name: string
	// scheduledDate: Date | null
	lastname: string
	email: string
	phone: string
	destination_adress: string
	pickup_adress: string
	department: string
	municiopio: string
	reference_point: string
	delivery_instructions: string
	// userId: string
	packages: Package[]
}

const Page = () => {
	const router = useRouter()
	const [step, setStep] = useState(1)
	const [formData, setFormData] = useState<Order>({
		name: '',
		lastname: '',
		email: '',
		phone: '',
		destination_adress: '',
		pickup_adress: '',
		department: '',
		municiopio: '',
		reference_point: '',
		delivery_instructions: '',
		// scheduledDate: null,
		// userId: '',
		packages: [],
	})

	useEffect(() => {
		// Configurar axios interceptor al montar el componente
		setupAxiosInterceptors()

		// Obtener y establecer el userId
		const userId = getUserId()
		if (!userId) {
			toast.error('No se ha iniciado sesión')
			router.push('/signin') // Redirigir si no hay usuario
			return
		}

		setFormData((prev) => ({ ...prev, userId }))
	}, [router])

	const handleOrderSubmit = (data: Partial<Order>) => {
		console.log('data de la orden', data)
		setFormData((prev) => ({ ...prev, ...data }))
		setStep(2)
	}

	const handlePackagesSubmit = (packages: Package[]) => {
		console.log('data de los paquetes', packages)

		setFormData((prev) => ({ ...prev, packages }))
		setStep(3)
	}

	const handleSubmit = async () => {
		// @ts-expect-error ignore
		const { packages, scheduledDate, ...restOfData } = formData

		const packagesData = {
			Packages: packages,
		}

		const finalData = { ...restOfData, ...packagesData }

		console.log(finalData)

		try {
			await axios.post('http://localhost:8080/orders/', finalData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			})
			toast.success('Orden creada exitosamente.')
			// Opcional: redirigir después de crear la orden
			router.push('/orders')
		} catch (error) {
			console.error(error)
			toast.error('Error al crear la orden, intente de nuevo')
		}
	}
	const handleBack = () => {
		setStep(step - 1)
	}

	return (
		<div className='flex flex-col justify-center items-center max-w-3xl mx-auto h-screen'>
			{step === 1 && <CreateOrder onSubmit={handleOrderSubmit} />}
			{step === 2 && <PackageForm onSubmit={handlePackagesSubmit} />}
			{step === 3 && (
				<div className='w-full'>
					<OrderReview order={formData} packages={formData.packages} />
					<Button className='w-[94%] mx-auto' onClick={handleSubmit}>
						Submit Order
					</Button>
				</div>
			)}
			{step > 1 && step < 3 && (
				<Button onClick={handleBack} className='w-[94%]' variant={'outline'}>
					Volver
				</Button>
			)}
		</div>
	)
}

export default Page
