import { Delivery } from "@/types/delivery"
import Link from "next/link"
import styles from "./DeliveryTable.module.css"

interface DeliveryTableProps {
	deliveries: Delivery[]
}

export default function DeliveryTable({ deliveries }: DeliveryTableProps) {
	return (
		<table className={styles.table}>
			<thead>
				<tr className={styles.headerRow}>
					<th className={styles.headerCell}>UUID</th>
					<th className={styles.headerCell}>Номер СДЭК</th>
					<th className={styles.headerCell}>Дата создания</th>
					<th className={styles.headerCell}>Текущий статус</th>
					<th className={styles.headerCell}>Откуда</th>
					<th className={styles.headerCell}>Куда</th>
					<th className={styles.headerCell}></th>
				</tr>
			</thead>
			<tbody>
				{deliveries.map((delivery) => {
					const currentStatus = delivery.entity.statuses[delivery.entity.statuses.length - 1]
					const creationStatus = delivery.entity.statuses.find((s) => s.code === "CREATED") || delivery.entity.statuses[0]
					const creationDate = new Date(creationStatus.date_time).toLocaleString("ru-RU")

					return (
						<tr key={delivery.entity.uuid} className={styles.row}>
							<td className={styles.cell}>{delivery.entity.uuid}</td>
							<td className={styles.cell}>{delivery.entity.cdek_number}</td>
							<td className={styles.cell}>{creationDate}</td>
							<td className={styles.cell}>{currentStatus.name}</td>
							<td className={styles.cell}>{delivery.entity.from_location.address}</td>
							<td className={styles.cell}>{delivery.entity.to_location.address}</td>
							<td className={styles.cell}>
								<Link href={`/deliveries/${delivery.entity.uuid}`} className={styles.link}>
									Подробнее
								</Link>
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}