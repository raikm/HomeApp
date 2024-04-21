import {
  Location,
  Measurement,
  MeasurementRange,
  MiFloraDevice,
  Plant,
  PlantCreationParameters,
  PlantUpdateParameters
} from '@raikm/domain-types'
import axios from 'axios'
import config from '../../../../config.json'

export class PlantService {
  async create(parameters: PlantCreationParameters): Promise<Plant | null> {
    const response = await axios.post(`${config.api.baseUrl}/api/plants`, parameters)

    return response.data
  }
  async update(id: string, parameters: PlantUpdateParameters): Promise<Plant | null> {
    const response = await axios.patch(`${config.api.baseUrl}/api/plants/${id}`, parameters)

    return response.data
  }

  async discover(duration: number): Promise<MiFloraDevice[]> {
    const response = await axios.get<MiFloraDevice[]>(
      `${config.api.baseUrl}/api/plants/discover/${duration}`
    )

    return response.data
  }

  async updateMeasurementRange(id: string, parameters: MeasurementRange): Promise<void | null> {
    await axios.patch(`${config.api.baseUrl}/api/plants/${id}/addMeasurementRange`, parameters)
  }

  async getMeasurementRange(id: string, type: string): Promise<MeasurementRange | null> {
    const response = await axios.get<MeasurementRange>(
      `${config.api.baseUrl}/api/plants/${id}/getMeasurementRange/${type}`
    )
    return response.data
  }

  async blinking(address: string): Promise<void> {
    const response = await axios.get<void>(`${config.api.baseUrl}/api/plants/blinking/${address}`)

    console.log(response)
  }

  async getAll(): Promise<Plant[]> {
    const response = await axios.get(`${config.api.baseUrl}/api/plants`).catch((error: any) => {
      return Promise.reject(error)
    })
    return response.data
  }

  async getOne(id: string): Promise<Plant | null> {
    const response = await axios.get(`${config.api.baseUrl}/api/plants/${id}`)

    return response.data
  }

  async delete(id: string): Promise<void> {
    const response = await axios.delete(`${config.api.baseUrl}/api/plants/${id}`)
  }

  async getAllLocations(): Promise<Location[]> {
    const response = await axios.get<Location[]>(`${config.api.baseUrl}/api/location/`)

    return response.data
  }

  async getLastMeasurements(id: string): Promise<Measurement | null> {
    const response = await axios.get<Measurement>(
      `${config.api.baseUrl}/api/plants/${id}/lastMeasurements`
    )

    return response?.data ?? null
  }
}
