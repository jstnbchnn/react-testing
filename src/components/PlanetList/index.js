import React, {useState, useEffect, useRef} from 'react';

import FetchClient from '../../clients/Fetch';
import PlanetService from '../../services/Planet';

const service = new PlanetService(new FetchClient())

function PlanetList({apiService = service}) {
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
    <div>
      <input type="search" ref={searchRef} placeholder="Search by name"></input>
      <button onClick={search}>Search</button>
      <ul>
        {planets.map((planet) => {
          return <li key={planet.name}>{planet.name}</li>
        })}
      </ul>
      <button onClick={previous}>Previous Page</button>
      <button onClick={next}>Next Page</button>
    </div>
  )
}

export default PlanetList