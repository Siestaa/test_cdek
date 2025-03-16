"use client"

import mockData from "@/mocks/deliveries.json"
import { Delivery, Filters } from "@/types/delivery"
import { createContext, ReactNode, useContext, useState } from "react"

interface DeliveryContextType {
	deliveries: Delivery[]
	filters: Filters
	setFilters: (filters: Filters) => void
	currentPage: number
	setCurrentPage: (page: number) => void
	itemsPerPage: number
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined)

export const DeliveryProvider = ({ children }: { children: ReactNode }) => {
	const [deliveries] = useState<Delivery[]>(mockData)
	const [filters, setFilters] = useState<Filters>({ status: "" })
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 10

	return (
		<DeliveryContext.Provider
			value={{ deliveries, filters, setFilters, currentPage, setCurrentPage, itemsPerPage }}
		>
			{children}
		</DeliveryContext.Provider>
	)
}

export const useDeliveryContext = () => {
	const context = useContext(DeliveryContext)
	if (!context) throw new Error("useDeliveryContext must be used within a DeliveryProvider")
	return context
}