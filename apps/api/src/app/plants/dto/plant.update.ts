import type { Location, PlantUpdateParameters as IPlantUpdateParameters } from '@raikm/domain-types'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class PlantUpdateParameters implements IPlantUpdateParameters {
  @IsNotEmpty()
  name!: string

  @IsOptional()
  location?: Location
}
