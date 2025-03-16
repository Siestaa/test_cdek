"use client"

import { useDeliveryContext } from "@/context/DeliveryContext"
import styles from "./Pagination.module.css"

interface PaginationProps {
	totalItems: number
}

export default function Pagination({ totalItems }: PaginationProps) {
	const { currentPage, setCurrentPage, itemsPerPage } = useDeliveryContext()
	const totalPages = Math.ceil(totalItems / itemsPerPage)

	return (
		<div className={styles.container}>
			<button
				onClick={() => setCurrentPage(currentPage - 1)}
				disabled={currentPage === 1}
				className={styles.button}
			>
				Назад
			</button>
			<span className={styles.text}>
				Страница {currentPage} из {totalPages}
			</span>
			<button
				onClick={() => setCurrentPage(currentPage + 1)}
				disabled={currentPage === totalPages}
				className={styles.button}
			>
				Вперед
			</button>
		</div>
	)
}