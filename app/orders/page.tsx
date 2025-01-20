'use client'

import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Badge, Eye } from 'lucide-react'
// Define the User interface
interface User {
	id: string
	name: string
	lastname: string
	email: string
	country: string
}

// Define the Package interface (assuming it's an empty array for now)
interface Package {
	id: string
	length: number
	height: number
	width: number
	weight: number
	content: string
}

// Define the main Order interface
export interface Order {
	id: string
	name: string
	lastname: string
	email: string
	phone: string
	destination_adress: string
	pickup_adress: string
	department: string
	municiopio: string
	reference_point: string
	delivery_instructions: string
	userId: string
	Packages: Package[]
	User: User
}

export default function Page() {
	const [orders, setOrders] = React.useState<Order[]>([])

	useEffect(() => {
		async function fetchOrders() {
			console.log(localStorage.getItem('token'))
			try {
				const res = await axios.get('http://localhost:8080/orders', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				console.log(res)
				setOrders(res.data)
			} catch (error) {
				console.log(error)
				toast.error('Error al obtener las ordenes, intente de nuevo')
			}
		}
		fetchOrders()
	}, [])

	return (
		<div className='space-y-6 max-w-6xl mx-auto h-full py-8 flex justify-center items-center'>
			<div className='w-full space-y-5'>
				<div className='flex justify-between items-center'>
					<h1 className='text-3xl font-bold'>Dashboard de Órdenes</h1>
					<Link href={'/orders/new'}>
						<Button>Crear Nueva Orden</Button>
					</Link>
				</div>

				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					<Card>
						<CardHeader>
							<CardTitle>Total de Órdenes</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-4xl font-bold'>{orders.length}</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Órdenes Pendientes</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-4xl font-bold'>{orders.length}</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Órdenes Completadas</CardTitle>
						</CardHeader>
						<CardContent>
							<p className='text-4xl font-bold'>0</p>
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Órdenes Recientes</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>Cliente</TableHead>
									<TableHead>Destino</TableHead>
									<TableHead>Estado</TableHead>
									<TableHead>Acción</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{orders.map((order) => (
									<TableRow key={order.id}>
										<TableCell>{order.id.slice(-6)}</TableCell>
										<TableCell>
											{order.name} {order.lastname}
										</TableCell>
										<TableCell>{order.destination_adress}</TableCell>
										<TableCell>
											<Badge>Pendiente</Badge>
										</TableCell>
										<TableCell>
											<Button variant='ghost' size='sm' asChild>
												<Link href={`/orders/${order.id}`}>
													<Eye className='mr-2 h-4 w-4' />
													Ver Detalles
												</Link>
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
