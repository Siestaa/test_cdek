import { DeliveryProvider, useDeliveryContext } from '@/context/DeliveryContext'
import { Delivery } from '@/types/delivery'
import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import DeliveryList from './DeliveryList'

const mockDeliveries: Delivery[] = [
	{
		entity: {
			uuid: 'abc-123',
			cdek_number: '1001',
			from_location: { city: 'City1', address: 'Address1' },
			to_location: { city: 'City2', address: 'Address2' },
			statuses: [{ code: 'CREATED', name: 'Создан', date_time: '2025-01-01', city: 'City' }],
			number: '',
			comment: '',
			shipment_point: '',
			delivery_point: '',
			sender: { company: '', name: '' },
			recipient: { company: '', name: '', phones: [] },
			packages: [],
			services: [],
		},
		related_entities: [],
	},
	{
		entity: {
			uuid: 'xyz-789',
			cdek_number: '2002',
			from_location: { city: 'City3', address: 'Address3' },
			to_location: { city: 'City4', address: 'Address4' },
			statuses: [{ code: 'DELIVERED', name: 'Доставлен', date_time: '2025-01-02', city: 'City' }],
			number: '',
			comment: '',
			shipment_point: '',
			delivery_point: '',
			sender: { company: '', name: '' },
			recipient: { company: '', name: '', phones: [] },
			packages: [],
			services: [],
		},
		related_entities: [],
	},
]

const customRender = (
	ui: React.ReactElement,
	contextValue: Partial<ReturnType<typeof useDeliveryContext>> = {}
): RenderResult => {
	const mockContextValue = {
		deliveries: mockDeliveries,
		filters: { status: '' },
		setFilters: jest.fn(),
		currentPage: 1,
		setCurrentPage: jest.fn(),
		itemsPerPage: 10,
		searchQuery: '',
		setSearchQuery: jest.fn(),
		...contextValue,
	}

	jest.spyOn(require('@/context/DeliveryContext'), 'useDeliveryContext').mockReturnValue(mockContextValue)

	return render(<DeliveryProvider>{ui}</DeliveryProvider>)
}

describe('DeliveryList', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it('renders delivery list with data', () => {
		customRender(<DeliveryList />, {})

		expect(screen.getByText('Список доставок')).toBeInTheDocument()
		expect(screen.getByText('Address1')).toBeInTheDocument()
		expect(screen.getByText('Address3')).toBeInTheDocument()
	})

	it('shows no data message when deliveries are empty', () => {
		customRender(<DeliveryList />, { deliveries: [] })

		expect(screen.getByText('Нет данных о доставках')).toBeInTheDocument()
	})

	it('filters deliveries by search query', () => {
		const setSearchQuery = jest.fn()
		const setCurrentPage = jest.fn()

		const { rerender } = customRender(<DeliveryList />, { setSearchQuery, setCurrentPage })

		const input = screen.getByPlaceholderText('Введите UUID или номер СДЭК')
		fireEvent.input(input, { target: { value: 'abc' } })

		expect(setSearchQuery).toHaveBeenCalledWith('abc')
		expect(setCurrentPage).toHaveBeenCalledWith(1)

		jest.spyOn(require('@/context/DeliveryContext'), 'useDeliveryContext').mockReturnValue({
			deliveries: mockDeliveries,
			filters: { status: '' },
			setFilters: jest.fn(),
			currentPage: 1,
			setCurrentPage,
			itemsPerPage: 10,
			searchQuery: 'abc',
			setSearchQuery,
		})

		rerender(
			<DeliveryProvider>
				<DeliveryList />
			</DeliveryProvider>
		)

		expect(screen.getByText('Address1')).toBeInTheDocument()
		expect(screen.queryByText('Address3')).not.toBeInTheDocument()
	})
})