'use client'

import DeliveryFilters from '@/components/deliveryFilters/DeliveryFilters'
import DeliveryTable from '@/components/deliveryTable/DeliveryTable'
import Pagination from '@/components/pagination/Pagination'
import { useDeliveryContext } from '@/context/DeliveryContext'
import { Delivery } from '@/types/delivery'
import { useEffect, useState } from 'react'
import styles from './DeliveryList.module.css'

export default function DeliveryList() {
	const { deliveries, filters, currentPage, itemsPerPage } =
		useDeliveryContext()
	const [paginatedDeliveries, setPaginatedDeliveries] = useState<Delivery[]>()
	const [countDeliveries, setCountDeliveries] = useState(1)

	useEffect(() => {
		const filteredDeliveries = Array.isArray(deliveries)
			? deliveries.filter(delivery => {
				const lastStatus =
					delivery.entity.statuses[delivery.entity.statuses.length - 1]
				return !filters.status || lastStatus.code === filters.status
			})
			: []
		setCountDeliveries(filteredDeliveries.length)
		const paginatedDeliveries = filteredDeliveries.slice(
			(currentPage - 1) * itemsPerPage,
			currentPage * itemsPerPage
		)

		setPaginatedDeliveries(paginatedDeliveries)
	}, [deliveries, filters, currentPage])

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
