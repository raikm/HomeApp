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

export class PlantService {
  async create(parameters: PlantCreationParameters): Promise<Plant | null> {
    const response = await axios.post(
      `${useNuxtApp().$config.public.baseURL}/api/plants`,
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

  async discover(duration: number): Promise<MiFloraDevice[]> {
    const response = await axios.get<MiFloraDevice[]>(
      `${useNuxtApp().$config.public.baseURL}/api/plants/discover/${duration}`
    )

    return response.data
  }

  async updateMeasurementRange(id: string, parameters: MeasurementRange): Promise<void | null> {
    await axios.patch(
      `${useNuxtApp().$config.public.baseURL}/api/plants/${id}/addMeasurementRange`,
      parameters
    )
  }

  async getMeasurementRange(id: string, type: string): Promise<MeasurementRange | null> {
    const response = await axios.get<MeasurementRange>(
      `${useNuxtApp().$config.public.baseURL}/api/plants/${id}/getMeasurementRange/${type}`
    )
    return response.data
  }

  async blinking(address: string): Promise<void> {
    const response = await axios.get<void>(
      `${useNuxtApp().$config.public.baseURL}/api/plants/blinking/${address}`
    )

    console.log(response)
  }

  async getAll(): Promise<Plant[]> {
    const response = await axios
      .get(`${useNuxtApp().$config.public.baseURL}/api/plants`)
      .catch((error: any) => {
        return Promise.reject(error)
      })
    return response.data
  }

  async getOne(id: string): Promise<Plant | null> {
    const response = await axios.get(`${useNuxtApp().$config.public.baseURL}/api/plants/${id}`)

    return response.data
  }

  async delete(id: string): Promise<void> {
    const response = await axios.delete(`${useNuxtApp().$config.public.baseURL}/api/plants/${id}`)
  }

  async getAllLocations(): Promise<Location[]> {
    const response = await axios.get<Location[]>(
      `${useNuxtApp().$config.public.baseURL}/api/location/`
    )

    return response.data
  }

  async getLastMeasurements(id: string): Promise<Measurement | null> {
    const response = await axios.get<Measurement>(
      `${useNuxtApp().$config.public.baseURL}/api/plants/${id}/lastMeasurements`
    )

    return response?.data ?? null
  }
}
