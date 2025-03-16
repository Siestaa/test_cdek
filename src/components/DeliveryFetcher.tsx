"use client"

import DeliveryDetails from "@/components/deliveryDetails/DeliveryDetails"
import { useDeliveryContext } from "@/context/DeliveryContext"

interface DeliveryFetcherProps {
	uuid: string
}

export default function DeliveryFetcher({ uuid }: DeliveryFetcherProps) {
	const { deliveries } = useDeliveryContext()
	const delivery = Array.isArray(deliveries)
		? deliveries.find((d) => d.entity.uuid === uuid)
		: undefined

	if (!delivery) return <p>Доставка не найдена</p>

	return <DeliveryDetails delivery={delivery} />
}