"use client"

import { useDeliveryContext } from "@/context/DeliveryContext"
import styles from "./DeliveryFilters.module.css"

export default function DeliveryFilters() {
	const { filters, setFilters, setCurrentPage, searchQuery, setSearchQuery } = useDeliveryContext()

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilters({ ...filters, status: e.target.value })
		setCurrentPage(1)
	}

	const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
		setSearchQuery(e.currentTarget.value)
		setCurrentPage(1)
	}

	return (
		<div className={styles.container}>
			<label htmlFor="search" className={styles.label}>
				Поиск:
			</label>
			<input
				id="search"
				type="text"
				value={searchQuery}
				onInput={handleSearchChange}
				placeholder="Введите UUID или номер СДЭК"
				className={styles.select}
			/>
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