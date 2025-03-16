"use client"

import { Delivery } from "@/types/delivery"
import Link from "next/link"
import styles from "./DeliveryDetails.module.css"

interface DeliveryDetailsProps {
	uuid?: string
	delivery?: Delivery
}

export default function DeliveryDetails({ uuid, delivery }: DeliveryDetailsProps) {
	return (
		<div className={styles.container}>
			<Link href="/" className={styles.backLink}>
				← Назад к списку
			</Link>
			<h1 className={styles.title}>Детали доставки по UUID: {uuid}</h1>
			{delivery ? (
				<div className={styles.content}>
					<p><strong>Номер СДЭК:</strong> {delivery.entity.cdek_number}</p>
					<p><strong>Комментарий:</strong> {delivery.entity.comment || "Нет"}</p>
					<p><strong>Отправитель:</strong> {delivery.entity.sender.company} ({delivery.entity.sender.name})</p>
					<p><strong>Получатель:</strong> {delivery.entity.recipient.company} ({delivery.entity.recipient.name})</p>
					<p><strong>Телефон получателя:</strong> {delivery.entity.recipient.phones[0]?.number || "Нет"}</p>
					<p><strong>Откуда:</strong> {delivery.entity.from_location.address}</p>
					<p><strong>Куда:</strong> {delivery.entity.to_location.address}</p>

					<h2 className={styles.subtitle}>История статусов</h2>
					<ul className={styles.list}>
						{delivery.entity.statuses.map((status, index) => (
							<li key={index}>
								{status.name} ({status.code}) - {new Date(status.date_time).toLocaleString()} - {status.city}
							</li>
						))}
					</ul>

					<h2 className={styles.subtitle}>Посылки</h2>
					<ul className={styles.list}>
						{delivery.entity.packages.map((pkg, index) => (
							<li key={index}>
								<p><strong>Номер:</strong> {pkg.number}</p>
								<p><strong>Штрихкод:</strong> {pkg.barcode}</p>
								<p><strong>Вес:</strong> {pkg.weight} г</p>
								<h3 className={styles.subSubtitle}>Товары:</h3>
								<ul className={styles.sublist}>
									{pkg.items.map((item, i) => (
										<li key={i}>
											{item.name} (Код: {item.ware_key}, Кол-во: {item.amount}, Стоимость: {item.cost} RUB)
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>

					<h2 className={styles.subtitle}>Услуги</h2>
					<ul className={styles.list}>
						{delivery.entity.services.map((service, index) => (
							<li key={index}>
								{service.code} - {service.total_sum} RUB
							</li>
						))}
					</ul>
				</div>
			) : (
				<p>Данные по UUID {uuid} не переданы</p>
			)}
		</div>
	)
}