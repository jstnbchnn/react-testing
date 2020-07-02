const API_HOST = 'https://swapi.dev/api'

class PlanetService {
  constructor(client) {
    this.client = client
  }

  async getPlanets(requestOptions) {
    const params = new URLSearchParams(requestOptions)
    const planets = await this.client.get(`${API_HOST}/planets?${params}`)
    return planets
  }

  async getPlanet(requestOptions) {
    const params = new URLSearchParams(requestOptions)
    const planet = await this.client.get(`${API_HOST}/planets/${requestOptions.id}?${params}`)
    return planet
  }
}

export default PlanetService