import { PublicTransportProvider } from '~~/types/public-transport'
import { PublicTransportService } from './publicTransport.service'

export const usePublicTransportService = (provider: PublicTransportProvider) =>
  new PublicTransportService(provider)
