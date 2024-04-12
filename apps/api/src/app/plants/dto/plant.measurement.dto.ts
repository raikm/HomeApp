import type { Measurement as IMeasurement } from '@raikm/domain-types'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class Measurement implements IMeasurement {
  @IsNotEmpty()
  @IsUUID()
  plantId!: string

  @IsNotEmpty()
  battery!: number

  @IsNotEmpty()
  soilFertility!: number

  @IsNotEmpty()
  soilMoisture!: number

  @IsNotEmpty()
  sunlight!: number

  @IsNotEmpty()
  temperature!: number

  @IsNotEmpty()
  time!: Date

  constructor(init?: Measurement) {
    Object.assign(this, init)
  }
}
