'use client'

import { useState } from 'react'
import { Package, Trash2, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { ScrollArea } from '@/components/ui/scroll-area'

interface PackageItem {
	id: string
	length: string
	height: string
	width: string
	weight: string
	content: string
}

export function PackageForm({
	onSubmit,
}: {
	onSubmit: (packages: PackageItem[]) => void
}) {
	const [packages, setPackages] = useState<PackageItem[]>([])
	const [currentPackage, setCurrentPackage] = useState({
		length: '',
		height: '',
		width: '',
		weight: '',
		content: '',
	})

	const handleAddPackage = () => {
		if (!isFormValid()) {
			toast.error('Por favor, rellena todos los campos.')
			return
		}

		const newPackage = {
			id: Date.now().toString(),
			...currentPackage,
		}
		setPackages([...packages, newPackage])
		setCurrentPackage({
			length: '',
			height: '',
			width: '',
			weight: '',
			content: '',
		})
	}

	const handleDeletePackage = (id: string) => {
		setPackages(packages.filter((pkg) => pkg.id !== id))
	}

	const isFormValid = () => {
		return (
			currentPackage.length.trim() !== '' &&
			currentPackage.height.trim() !== '' &&
			currentPackage.width.trim() !== '' &&
			currentPackage.weight.trim() !== '' &&
			currentPackage.content.trim() !== ''
		)
	}

	const handleSubmit = () => {
		if (packages.length === 0) {
			toast.error('Por favor, agrega al menos un paquete.')
			return
		}
		onSubmit(packages)
	}

	return (
		<div className='max-w-4xl mx-auto p-6 space-y-8'>
			<div>
				<div className='space-y-2 mb-8'>
					<h1 className='text-2xl font-semibold text-gray-800'>
						Crea una orden
					</h1>
					<p className='text-gray-600'>
						Dale una ventaja competitiva a tu negocio con entregas{' '}
						<span className='font-medium'>el mismo día</span> (Área
						Metropolitana) y{' '}
						<span className='font-medium'>el día siguiente</span> a nivel
						nacional.
					</p>
				</div>
				<h2 className='font-semibold text-gray-800'>Agrega tus bultos</h2>
				<div className='bg-gray-50 p-6 rounded-lg'>
					<div className='flex items-start space-x-4'>
						<Package className='h-6 w-6 text-gray-400 mt-7' />
						<div className='flex-1 space-x-4 flex justify-center items-center'>
							<div className='flex space-x-0'>
								<div className='w-[94px]'>
									<Label className='text-sm text-gray-600'>Largo</Label>
									<div className='relative'>
										<Input
											required
											type='number'
											value={currentPackage.length}
											onChange={(e) =>
												setCurrentPackage({
													...currentPackage,
													length: e.target.value,
												})
											}
											className='pr-8 rounded-r-none bg-white'
										/>
										<span className='absolute right-3 top-2 text-sm text-gray-400 bg-white'>
											cm
										</span>
									</div>
								</div>

								<div className='w-[94px]'>
									<Label className='text-sm text-gray-600'>Alto</Label>
									<div className='relative'>
										<Input
											required
											type='number'
											value={currentPackage.height}
											onChange={(e) =>
												setCurrentPackage({
													...currentPackage,
													height: e.target.value,
												})
											}
											className='pr-8 rounded-l-none bg-white'
										/>
										<span className='absolute right-3 top-2 text-sm text-gray-400'>
											cm
										</span>
									</div>
								</div>

								<div className='w-[94px]'>
									<Label className='text-sm text-gray-600'>Ancho</Label>
									<div className='relative'>
										<Input
											required
											type='number'
											value={currentPackage.width}
											onChange={(e) =>
												setCurrentPackage({
													...currentPackage,
													width: e.target.value,
												})
											}
											className='pr-8 rounded-l-none bg-white'
										/>
										<span className='absolute right-3 top-2 text-sm text-gray-400'>
											cm
										</span>
									</div>
								</div>
							</div>
							<div className='flex space-x-4'>
								<div className='w-32'>
									<Label className='text-sm text-gray-600'>
										Peso en libras
									</Label>
									<div className='relative'>
										<Input
											required
											type='text'
											value={currentPackage.weight}
											onChange={(e) =>
												setCurrentPackage({
													...currentPackage,
													weight: e.target.value,
												})
											}
											className='pr-6 bg-white'
										/>
										<span className='absolute right-3 top-2 text-sm text-gray-400'>
											lb
										</span>
									</div>
								</div>
								<div className='flex-1'>
									<Label className='text-sm text-gray-600'>Contenido</Label>
									<Input
										required
										type='text'
										value={currentPackage.content}
										onChange={(e) =>
											setCurrentPackage({
												...currentPackage,
												content: e.target.value,
											})
										}
										className='bg-white'
										placeholder='Descripción del contenido'
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='pt-6 w-full flex justify-end'>
						<Button
							onClick={handleAddPackage}
							variant='outline'
							className='bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
							// disabled={!isFormValid()}
						>
							<Plus className='h-4 w-4 mr-2' />
							Agregar
						</Button>
					</div>
				</div>
			</div>

			{/* Lista de bultos / paquetes */}
			<h2 className='font-semibold text-gray-800'>Lista de bultos</h2>

			<ScrollArea className='h-[300px] w-full rounded-md border p-4'>
				{packages.length > 0 && (
					<div className='space-y-4'>
						{packages.map((pkg) => (
							<div
								key={pkg.id}
								className='border border-green-500 rounded-lg p-4 flex items-center justify-between'>
								<div className='flex items-center w-full'>
									<div className='w-[20%]'>
										<div className='text-sm text-gray-500'>Peso en libras</div>
										<div className='p-4 border rounded-lg'>{pkg.weight} lb</div>
									</div>
									<div className='w-[40%] flex-1'>
										<div className='text-sm text-gray-500'>Contenido</div>
										<div className='p-4 border rounded-lg'>{pkg.content}</div>
									</div>
									<div className='w-[40%] flex items-center justify-center'>
										<Package className='h-8 w-8 mt-3 text-gray-400' />
										<div>
											<div className='text-sm text-gray-500'>Largo</div>
											<div className='border border-zinc-200 p-3 rounded rounded-r-none'>
												{pkg.length} <span className='text-gray-600'>cm</span>
											</div>
										</div>
										<div>
											<div className='text-sm text-gray-500'>Alto</div>
											<div className='border border-zinc-200 p-3 rounded rounded-r-none rounded-l-none'>
												{pkg.height} <span className='text-gray-600'>cm</span>
											</div>
										</div>
										<div>
											<div className='text-sm text-gray-500'>Ancho</div>
											<div className='border border-zinc-200 p-3 rounded rounded-l-none'>
												{pkg.width} <span className='text-gray-600'>cm</span>
											</div>
										</div>
									</div>
								</div>
								<Button
									variant='ghost'
									size='icon'
									className='text-red-500 hover:text-red-600 hover:bg-red-50'
									onClick={() => handleDeletePackage(pkg.id)}>
									<Trash2 className='h-5 w-5' />
								</Button>
							</div>
						))}
					</div>
				)}
			</ScrollArea>
			<Button onClick={handleSubmit} className='mt-6 w-full'>
				Siguiente
			</Button>
		</div>
	)
}
