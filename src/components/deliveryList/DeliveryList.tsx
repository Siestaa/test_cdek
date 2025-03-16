"use client"

import DeliveryFilters from "@/components/deliveryFilters/DeliveryFilters"
import DeliveryTable from "@/components/deliveryTable/DeliveryTable"
import Pagination from "@/components/pagination/Pagination"
import { useDeliveryContext } from "@/context/DeliveryContext"
import { Delivery } from "@/types/delivery"
import { useEffect, useState } from "react"
import styles from "./DeliveryList.module.css"

export default function DeliveryList() {
	const { deliveries, filters, currentPage, itemsPerPage, searchQuery } = useDeliveryContext()
	const [paginatedDeliveries, setPaginatedDeliveries] = useState<Delivery[] | undefined>()
	const [countDeliveries, setCountDeliveries] = useState(0)

	useEffect(() => {
		const filteredDeliveries = Array.isArray(deliveries)
			? deliveries.filter(delivery => {
				const lastStatus = delivery.entity.statuses[delivery.entity.statuses.length - 1]
				const matchesStatus = !filters.status || lastStatus.code === filters.status
				const matchesSearch = !searchQuery ||
					delivery.entity.uuid.toLowerCase().includes(searchQuery.toLowerCase()) ||
					delivery.entity.cdek_number.toLowerCase().includes(searchQuery.toLowerCase())
				return matchesStatus && matchesSearch
			})
			: []
		const newPaginatedDeliveries = filteredDeliveries.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage
		)

		if (
			countDeliveries !== filteredDeliveries.length ||
			JSON.stringify(paginatedDeliveries) !== JSON.stringify(newPaginatedDeliveries)
		) {
			setCountDeliveries(filteredDeliveries.length)
			setPaginatedDeliveries(newPaginatedDeliveries)
		}
	}, [deliveries, filters, currentPage, itemsPerPage, searchQuery, countDeliveries, paginatedDeliveries])

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Список доставок</h1>
			<DeliveryFilters />
			{paginatedDeliveries && paginatedDeliveries.length > 0 ? (
				<>
					<DeliveryTable deliveries={paginatedDeliveries} />
					<Pagination totalItems={countDeliveries} />
				</>
			) : (
				<p>Нет данных о доставках</p>
			)}
		</div>
	)
}