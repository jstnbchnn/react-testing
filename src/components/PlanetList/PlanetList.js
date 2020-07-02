import React from 'react';

function PlanetList({planets = [], searchRef, search, previous, next}) {
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