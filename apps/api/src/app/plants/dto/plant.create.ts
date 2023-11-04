import type {
  Location,
  PlantCreationParameters as IPlantCreationParameters
} from '@nevo/domain-types'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class PlantCreationParameters implements IPlantCreationParameters {
  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  address!: string

  @IsNotEmpty()
  version!: string

  @IsOptional()
  location?: Location
}
