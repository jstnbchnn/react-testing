import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react';

import PlanetList from './index';
import {pageOne, pageTwo} from '../../fixtures/planets.fixture';

describe('PlanetList', () => {
  it('loads the data correctly', async () => {
    const mockService = {
      getPlanets: jest.fn().mockResolvedValue(pageOne)
    }
    render(<PlanetList apiService={mockService}/>)
    await screen.findByText('Tatooine')
    expect(screen.getByText('Alderaan'))
  })

  it('gets the next page', async () => {
    const mockService = {
      getPlanets: jest.fn().mockResolvedValue(pageOne)
    }

    render(<PlanetList apiService={mockService}/>)
    await screen.findByText('Tatooine')

    mockService.getPlanets.mockResolvedValueOnce(pageTwo)
    fireEvent.click(screen.getByText('Next Page'))
    await screen.findByText('Geonosis')

    expect(mockService.getPlanets).toHaveBeenCalledWith(
      expect.objectContaining({page: 2})
    )
  })

  it('searches', async () => {
    const mockService = {
      getPlanets: jest.fn().mockResolvedValue(pageOne)
    }

    render(<PlanetList apiService={mockService}/>)
    await screen.findByText('Tatooine')

    fireEvent.change(screen.getByPlaceholderText('Search by name'), {
      target: {
        value: 'Tatooine'
      }
    })

    await act(async () => {
      fireEvent.click(screen.getByText('Search'))
    })

    expect(mockService.getPlanets).toHaveBeenCalledWith(
      expect.objectContaining({search: 'Tatooine'})
    )
  })
})
