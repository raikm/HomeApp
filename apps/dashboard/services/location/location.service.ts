import {
  Location,
  LocationCreationParameters,
  Measurement,
  MeasurementRange,
  MiFloraDevice,
  Plant,
  PlantCreationParameters,
  PlantUpdateParameters
} from '@raikm/domain-types'
import axios from 'axios'
import config from '../../../../config.json'

export class LocationService {
  async create(parameters: LocationCreationParameters): Promise<Location | null> {
    const response = await axios.post(`${config.api.baseUrl}/api/location`, parameters)

    return response.data
  }
  async update(id: string, parameters: PlantUpdateParameters): Promise<Plant | null> {
    const response = await axios.patch(`${config.api.baseUrl}/api/plants/${id}`, parameters)

    return response.data
  }

  async getAll(): Promise<Location[]> {
    const response = await axios.get<Location[]>(`${config.api.baseUrl}/api/location/`)

    return response.data
  }

  async getOne(id: string): Promise<Plant | null> {
    const response = await axios.get(`${config.api.baseUrl}/api/plants/${id}`)

    return response.data
  }

  async delete(id: string): Promise<void> {
    const response = await axios.delete(`${config.api.baseUrl}/api/plants/${id}`)
  }
}
