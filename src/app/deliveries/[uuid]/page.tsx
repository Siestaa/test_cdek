import DeliveryFetcher from '@/components/DeliveryFetcher'

interface DeliveryPageProps {
	params: Promise<{ uuid: string }>
}

export default async function DeliveryPage({ params }: DeliveryPageProps) {
	const resolvedParams = await params
	const { uuid } = resolvedParams

	return <DeliveryFetcher uuid={uuid} />
}
