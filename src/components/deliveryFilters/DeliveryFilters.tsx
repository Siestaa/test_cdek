"use client"

import { useDeliveryContext } from "@/context/DeliveryContext"
import styles from "./DeliveryFilters.module.css"

export default function DeliveryFilters() {
	const { filters, setFilters } = useDeliveryContext()

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilters({ ...filters, status: e.target.value })
	}

	return (
		<div className={styles.container}>
			<label htmlFor="status" className={styles.label}>
				Фильтр по статусу:
			</label>
			<select
				id="status"
				value={filters.status}
				onChange={handleStatusChange}
				className={styles.select}
			>
				<option value="">Все</option>
				<option value="CREATED">Создан</option>
				<option value="ACCEPTED">Принят</option>
				<option value="IN_TRANSIT">В пути</option>
				<option value="DELIVERED">Доставлен</option>
				<option value="CANCELLED">Отменен</option>
			</select>
		</div>
	)
}