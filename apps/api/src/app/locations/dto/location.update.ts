import { type LocationUpdateParameters as ILocationUpdateParameters } from '@raikm/domain-types'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class LocationUpdateParameters implements ILocationUpdateParameters {
  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  @IsNumber()
  floor!: number
}
