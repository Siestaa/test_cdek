import { render, screen, fireEvent } from '@testing-library/react';
import DeliveryFilters from './DeliveryFilters';
import { DeliveryProvider, useDeliveryContext } from '@/context/DeliveryContext';

describe('DeliveryFilters', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('resets currentPage to 1 when filter changes', () => {
    const setFilters = jest.fn();
    const setCurrentPage = jest.fn();

    jest.spyOn(require('@/context/DeliveryContext'), 'useDeliveryContext').mockReturnValue({
      deliveries: [],
      filters: { status: '' },
      setFilters,
      currentPage: 3,
      setCurrentPage,
      itemsPerPage: 10,
      searchQuery: '',
      setSearchQuery: jest.fn(),
    });

    render(
      <DeliveryProvider>
        <DeliveryFilters />
      </DeliveryProvider>
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'CREATED' } });

    expect(setFilters).toHaveBeenCalledWith({ status: 'CREATED' });
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });

  it('updates searchQuery and resets currentPage on input', () => {
    const setSearchQuery = jest.fn();
    const setCurrentPage = jest.fn();

    jest.spyOn(require('@/context/DeliveryContext'), 'useDeliveryContext').mockReturnValue({
      deliveries: [],
      filters: { status: '' },
      setFilters: jest.fn(),
      currentPage: 2,
      setCurrentPage,
      itemsPerPage: 10,
      searchQuery: '',
      setSearchQuery,
    });

    render(
      <DeliveryProvider>
        <DeliveryFilters />
      </DeliveryProvider>
    );

    const input = screen.getByPlaceholderText('Введите UUID или номер СДЭК');
    fireEvent.input(input, { target: { value: 'test' } });

    expect(setSearchQuery).toHaveBeenCalledWith('test');
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });
});