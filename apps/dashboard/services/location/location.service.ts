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
  async create(parameters: LocationCreationParameters): Promise<Location | null> {
    const response = await axios.post(
      `${useNuxtApp().$config.public.baseURL}/api/location`,
      parameters
    )

    return response.data
  }
  async update(id: string, parameters: PlantUpdateParameters): Promise<Plant | null> {
    const response = await axios.patch(
      `${useNuxtApp().$config.public.baseURL}/api/plants/${id}`,
      parameters
    )

    return response.data
  }

  async getAll(): Promise<Location[]> {
    const response = await axios.get<Location[]>(
      `${useNuxtApp().$config.public.baseURL}/api/location/`
    )

    return response.data
  }

  async getOne(id: string): Promise<Plant | null> {
    const response = await axios.get(`${useNuxtApp().$config.public.baseURL}/api/plants/${id}`)

    return response.data
  }

  async delete(id: string): Promise<void> {
    const response = await axios.delete(`${useNuxtApp().$config.public.baseURL}/api/plants/${id}`)
  }
}
