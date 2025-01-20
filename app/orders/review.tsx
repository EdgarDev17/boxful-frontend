'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { MapPin, User, Home, Calendar, Package } from 'lucide-react'
import type { Order, Package as PackageType } from './new/page'

interface OrderReviewProps {
	order: Order
	packages: PackageType[]
}

export function OrderReview({ order, packages }: OrderReviewProps) {
	return (
		<Card className='w-full max-w-4xl mx-auto shadow-lg'>
			<CardHeader className='bg-blue-600 text-primary-foreground'>
				<CardTitle className='text-2xl'>Revisa tu Orden</CardTitle>
			</CardHeader>
			<CardContent className='p-6'>
				<div className='space-y-8'>
					<OrderDetails order={order} />
					<Separator />
					<PackagesList packages={packages} />
				</div>
			</CardContent>
		</Card>
	)
}

function OrderDetails({ order }: { order: Order }) {
	return (
		<div className='space-y-6'>
			<h3 className='text-xl font-semibold'>Detalles de la Orden</h3>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<DetailSection title='Información de Recogida' icon={MapPin}>
					<DetailItem label='Dirección' value={order.pickup_adress} />
				</DetailSection>
				<DetailSection title='Información Personal' icon={User}>
					<DetailItem
						label='Nombre'
						value={`${order.name} ${order.lastname}`}
					/>
					<DetailItem label='Correo' value={order.email} />
					<DetailItem label='Teléfono' value={order.phone} />
				</DetailSection>
				<DetailSection title='Información de Destino' icon={Home}>
					<DetailItem label='Dirección' value={order.destination_adress} />
					<DetailItem label='Departamento' value={order.department} />
					<DetailItem label='Municipio' value={order.municiopio} />
					<DetailItem label='Referencia' value={order.reference_point} />
				</DetailSection>
				<DetailSection title='Información Adicional' icon={Calendar}>
					<DetailItem
						label='Fecha Programada'
						//@ts-expect-error mejorar esta parte
						value={new Date(order.scheduledDate).toLocaleString('es-ES', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})}
					/>
					<DetailItem label='Instrucciones' value={order.instructions} />
				</DetailSection>
			</div>
		</div>
	)
}

function PackagesList({ packages }: { packages: PackageType[] }) {
	return (
		<div className='space-y-6'>
			<h3 className='text-xl font-semibold flex items-center gap-2'>
				<Package className='w-6 h-6' />
				Paquetes
			</h3>
			<div className='overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow className='bg-muted'>
							<TableHead className='font-semibold'>ID</TableHead>
							<TableHead className='font-semibold'>
								Dimensiones (L x A x A)
							</TableHead>
							<TableHead className='font-semibold'>Peso (lb)</TableHead>
							<TableHead className='font-semibold'>Contenido</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{packages.map((pkg) => (
							<TableRow key={pkg.id} className='hover:bg-muted/50'>
								<TableCell>{pkg.id}</TableCell>
								<TableCell>{`${pkg.length} x ${pkg.width} x ${pkg.height}`}</TableCell>
								<TableCell>{pkg.weight}</TableCell>
								<TableCell>{pkg.content}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

function DetailSection({
	title,
	children,
	icon: Icon,
}: {
	title: string
	children: React.ReactNode
	icon: React.ElementType
}) {
	return (
		<div className='space-y-3 bg-muted/30 p-4 rounded-lg'>
			<h4 className='font-semibold text-lg flex items-center gap-2'>
				<Icon className='w-5 h-5' />
				{title}
			</h4>
			{children}
		</div>
	)
}

function DetailItem({
	label,
	value,
	icon: Icon,
}: {
	label: string
	value: string
	icon?: React.ElementType
}) {
	return (
		<div className='flex items-start gap-2'>
			{Icon && <Icon className='w-4 h-4 mt-1 text-muted-foreground' />}
			<div>
				<span className='font-medium text-sm text-muted-foreground'>
					{label}:
				</span>{' '}
				<span className='text-sm'>{value}</span>
			</div>
		</div>
	)
}
