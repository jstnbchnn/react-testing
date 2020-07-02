class Fetch {
  async get(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw response
      }

      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      throw error
    }
  }
}

export default Fetch