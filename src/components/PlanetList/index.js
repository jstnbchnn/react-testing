import React, {useState, useEffect, useRef} from 'react';

import PlanetList from './PlanetList';
import FetchClient from '../../clients/Fetch';
import PlanetService from '../../services/Planet';

const service = new PlanetService(new FetchClient())

function PlanetListContainer({apiService = service}) {
  const [planets, setPlanets] = useState([])
  const searchRef = useRef()
  const currentPage = useRef(1)

  useEffect(() => {
    const loadPlanets = async () => {
      const response = await apiService.getPlanets({})
      setPlanets(response.results)
    }

    loadPlanets()
  }, [apiService])

  const search = async () => {
    const searchTerm = searchRef.current.value
    const response = await apiService.getPlanets({search: searchTerm})
    setPlanets(response.results)
  }

  const previous = async () => {
    const searchTerm = searchRef.current.value
    currentPage.current = currentPage.current - 1
    const response = await apiService.getPlanets({search: searchTerm, page: currentPage.current})
    setPlanets(response.results)
  }

  const next = async () => {
    const searchTerm = searchRef.current.value
    currentPage.current = currentPage.current + 1
    const response = await apiService.getPlanets({search: searchTerm, page: currentPage.current})
    setPlanets(response.results)
  }

  return (
    <PlanetList
      planets={planets}
      next={next}
      previous={previous}
      searchRef={searchRef}
      search={search}
    />
  )
}

export default PlanetListContainer