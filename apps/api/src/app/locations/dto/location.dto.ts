import { type Location as ILocation } from '@raikm/domain-types'
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator'

export class Location implements ILocation {
  @IsUUID()
  id!: string

  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  @IsNumber()
  floor!: number

  constructor(init?: Location) {
    Object.assign(this, init)
  }
}
