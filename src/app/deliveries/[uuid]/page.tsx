import DeliveryFetcher from "@/components/DeliveryFetcher"

export default function DeliveryPage({ params }: { params: { uuid: string } }) {
	return <DeliveryFetcher uuid={params.uuid} />
}