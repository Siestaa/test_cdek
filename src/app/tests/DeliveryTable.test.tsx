import { render, screen } from "@testing-library/react"
import DeliveryTable from "@/components/deliveryTable/DeliveryTable"

const mockDeliveries = [
	{
		entity: {
			uuid: "f2d45fd9-0a0c-4c1a-b704-d32adcaa5fe5",
			cdek_number: "10084985780",
			from_location: { city: "Краснодар", address: "ул. Станционная, 2" },
			to_location: { city: "Краснодар", address: "улица Тихая 7" },
			statuses: [
				{ code: "CREATED", name: "Создан", date_time: "2025-02-14T08:02:36+0000", city: "Офис СДЭК" },
				{ code: "ACCEPTED", name: "Принят", date_time: "2025-02-14T08:02:36+0000", city: "Офис СДЭК" }
			],
			sender: { company: "", name: "" },
			recipient: { company: "", name: "", phones: [] },
			packages: [],
			services: [],
		},
		related_entities: [],
	},
]

describe("DeliveryTable", () => {
	it("renders delivery data correctly", () => {
		render(<DeliveryTable deliveries={mockDeliveries} />)
		expect(screen.getByText("f2d45fd9-0a0c-4c1a-b704-d32adcaa5fe5")).toBeInTheDocument()
		expect(screen.getByText("10084985780")).toBeInTheDocument()
		expect(screen.getByText("Принят")).toBeInTheDocument()
		expect(screen.getByText("ул. Станционная, 2")).toBeInTheDocument()
	})