import { LocationService } from './location.service'

const service = new LocationService()

export const useLocationService = () => service
