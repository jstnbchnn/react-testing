import PlanetService from './index';

describe('PlanetService', () => {
  it('gets planets with request options', () => {
    const mockClient = {
      get: jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn()
      })
    }

    const service = new PlanetService(mockClient)
    service.getPlanets({search: 'boba fett'})

    expect(mockClient.get).toHaveBeenCalledWith(
      expect.stringContaining('/planets?search=boba+fett')
    )
  })
})