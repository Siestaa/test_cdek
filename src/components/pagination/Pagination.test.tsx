import * as DeliveryContext from '@/context/DeliveryContext'
import { DeliveryProvider } from '@/context/DeliveryContext'
import { fireEvent, render, screen } from '@testing-library/react'
import Pagination from './Pagination'

describe('Pagination', () => {
	it('renders pagination and handles navigation', () => {
		const setCurrentPage = jest.fn()

		jest.spyOn(DeliveryContext, 'useDeliveryContext').mockReturnValue({
			deliveries: [],
			filters: { status: '' },
			setFilters: jest.fn(),
			currentPage: 1,
			setCurrentPage,
			itemsPerPage: 10,
			searchQuery: '',
			setSearchQuery: jest.fn(),
		})

		render(
			<DeliveryProvider>
				<Pagination totalItems={25} />
			</DeliveryProvider>
		)

		expect(screen.getByText('Страница 1 из 3')).toBeInTheDocument()
		expect(screen.getByText('Назад')).toBeDisabled()

		const nextButton = screen.getByText('Вперед')
		fireEvent.click(nextButton)
		expect(setCurrentPage).toHaveBeenCalledWith(2)
	})
})