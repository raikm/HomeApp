import { PlantService } from './plant.service'

const service = new PlantService()

export const usePlantService = () => service
