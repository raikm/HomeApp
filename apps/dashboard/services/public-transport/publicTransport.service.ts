import axios from 'axios'
import { Departure, PublicTransportProvider, StopOrDestination } from '~~/types/public-transport'

export class PublicTransportService {
  provider: PublicTransportProvider

  constructor(provider: PublicTransportProvider) {
    this.provider = provider
  }

  async getDepartures(stopId: string): Promise<Departure[]> {
    switch (this.provider) {
      case 'BVG':
        return this.getBvgDepartures(stopId)
      default:
        break
    }
  }

  async getDeparturesFromMultipleStops(stopIds: string[]): Promise<Departure[]> {
    let departures: Departure[] = []

    switch (this.provider) {
      case 'BVG':
        for (const stopId of stopIds) {
          const _departures = await this.getBvgDepartures(stopId)
          departures = [...departures, ..._departures]
        }
      default:
        break
    }
    departures = departures.sort((a: Departure, b: Departure) =>
      new Date(a.plannedWhen!) > new Date(b.plannedWhen!) ? 1 : -1
    )
    return departures
  }

  async getStopsWithName(stationName: string): Promise<StopOrDestination[]> {
    switch (this.provider) {
      case 'BVG':
        return this.getBvgStopsWithName(stationName)
      default:
        break
    }
  }

  async getStopsNearby(latitude: number, longitude: number): Promise<StopOrDestination[]> {
    switch (this.provider) {
      case 'BVG':
        return this.getBvgStopsNearby(latitude, longitude)
      default:
        break
    }
  }

  async getBvgDepartures(stopId: string) {
    const response = await axios.get(
      `https://v5.bvg.transport.rest/stops/${stopId}/departures?results=5`
    )
    return response.data
  }

  async getBvgStopsNearby(latitude: number, longitude: number): Promise<StopOrDestination[]> {
    const response = await axios.get(
      `https://v5.bvg.transport.rest/stops/nearby?latitude=${latitude}&longitude=${longitude}`
    )
    return response.data
  }

  async getBvgStopsWithName(stationName: string): Promise<StopOrDestination[]> {
    const response = await axios.get(
      `https://v5.bvg.transport.rest/locations?poi=false&addresses=false&query=${stationName}`
    )
    return response.data
  }
}
