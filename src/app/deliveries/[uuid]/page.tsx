import DeliveryDetails from "@/components/deliveryDetails/DeliveryDetails"

interface DeliveryPageProps {
	params: Promise<{ uuid: string }>
}

export default async function DeliveryPage({ params }: DeliveryPageProps) {
	const resolvedParams = await params
	const { uuid } = resolvedParams

	return <DeliveryDetails uuid={uuid} />
}