"use client"

import DeliveryList from '@/components/deliveryList/DeliveryList'
import { useDeliveryContext } from "@/context/DeliveryContext"

export default function Home() {
  const { deliveries, filters, currentPage, setCurrentPage, itemsPerPage } = useDeliveryContext()

  const filteredDeliveries = deliveries.filter(
    (delivery) =>
      !filters.status ||
      delivery.entity.statuses.some((s) => s.code === filters.status)
  )
  const paginatedDeliveries = filteredDeliveries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div>
      <DeliveryList />
    </div>
  )
}