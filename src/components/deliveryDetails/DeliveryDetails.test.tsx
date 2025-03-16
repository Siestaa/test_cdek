import DeliveryDetails from '@/components/deliveryDetails/DeliveryDetails'
import { Delivery } from '@/types/delivery'
import { render, screen } from '@testing-library/react'

const mockDelivery: Delivery = {
	entity: {
		uuid: '1',
		cdek_number: '1001',
		comment: 'Test comment',
		from_location: { city: 'City1', address: 'Address1' },
		to_location: { city: 'City2', address: 'Address2' },
		sender: { company: 'SenderCo', name: 'Sender' },
		recipient: { company: 'RecCo', name: 'Recipient', phones: [{ number: '+123' }] },
		statuses: [{ code: 'CREATED', name: 'Создан', date_time: '2025-01-01T00:00:00Z', city: 'City' }],
		packages: [],
		services: [],
		number: '',
		shipment_point: '',
		delivery_point: '',
	},
	related_entities: [],
}

describe('DeliveryDetails', () => {
	it('renders delivery details correctly', () => {
		render(<DeliveryDetails delivery={mockDelivery} />)

		expect(screen.getByText('Детали доставки #1001')).toBeInTheDocument()
		expect(screen.getByText('← Назад к списку')).toBeInTheDocument()
		expect(screen.getByText((content, element) => {
			return element?.textContent === 'UUID: 1'
		})).toBeInTheDocument()
		expect(screen.getByText((content, element) => {
			return element?.textContent === 'Номер СДЭК: 1001'
		})).toBeInTheDocument()
		expect(screen.getByText((content, element) => {
			return element?.textContent === 'Комментарий: Test comment'
		})).toBeInTheDocument()
		expect(screen.getByText((content, element) => {
			return element?.textContent === 'Отправитель: SenderCo (Sender)'
		})).toBeInTheDocument()
		expect(screen.getByText((content, element) => {
			return element?.textContent === 'Телефон получателя: +123'
		})).toBeInTheDocument()
	})
})