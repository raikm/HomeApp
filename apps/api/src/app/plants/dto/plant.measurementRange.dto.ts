import type { MeasurementRange as IMeasurementRange, MeasurementType } from '@nevo/domain-types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class MeasurementRange implements IMeasurementRange {
  @IsUUID()
  id!: string

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

  constructor(init?: MeasurementRange) {
    Object.assign(this, init)
  }
}
