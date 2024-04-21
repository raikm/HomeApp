import type {
  MeasurementRangeCreationParameters as IMeasurementRangeCreationParameters,
  MeasurementType
} from '@raikm/domain-types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class MeasurementRangeCreationParameters implements IMeasurementRangeCreationParameters {
  @IsNotEmpty()
  type!: MeasurementType

  @IsNotEmpty()
  unit!: string

  @IsNotEmpty()
  min!: number

  @IsNotEmpty()
  max!: number

  @IsNotEmpty()
  @IsUUID()
  plantId!: string

  constructor(init?: MeasurementRangeCreationParameters) {
    Object.assign(this, init)
  }
}
