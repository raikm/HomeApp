import { type LocationCreationParameters as ILocationCreationParameters } from '@raikm/domain-types'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class LocationCreationParameters implements ILocationCreationParameters {
  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  @IsNumber()
  floor!: number
}
