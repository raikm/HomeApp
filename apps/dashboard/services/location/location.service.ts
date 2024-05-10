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

export class LocationService {
  config = useRuntimeConfig()

  async create(parameters: LocationCreationParameters): Promise<Location | null> {
    const response = await axios.post(`${this.config.public.baseURL}/api/location`, parameters)

    return response.data
  }
  async update(id: string, parameters: PlantUpdateParameters): Promise<Plant | null> {
    const response = await axios.patch(`${this.config.public.baseURL}/api/plants/${id}`, parameters)

    return response.data
  }

  async getAll(): Promise<Location[]> {
    const response = await axios.get<Location[]>(`${this.config.public.baseURL}/api/location/`)

    return response.data
  }

  async getOne(id: string): Promise<Plant | null> {
    const response = await axios.get(`${this.config.public.baseURL}/api/plants/${id}`)

    return response.data
  }

  async delete(id: string): Promise<void> {
    const response = await axios.delete(`${this.config.public.baseURL}/api/plants/${id}`)
  }
}
