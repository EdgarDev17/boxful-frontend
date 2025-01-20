import Image from 'next/image'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md'>
				<div className='flex justify-center'>
					<Image
						src={'/logocomplete.png'}
						height={180}
						width={180}
						alt='Boxful logo'
					/>
				</div>
				{children}
			</div>
		</div>
	)
}
