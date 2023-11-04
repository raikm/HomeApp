import { Location, type Plant as IPlant } from '@nevo/domain-types'
import { IsMACAddress, IsNotEmpty, IsSemVer, IsUUID } from 'class-validator'

export class Plant implements IPlant {
  @IsUUID()
  id!: string

  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  @IsMACAddress()
  address!: string

  @IsNotEmpty()
  @IsSemVer()
  version!: string

  location?: Location | undefined

  constructor(init?: Location) {
    Object.assign(this, init)
  }
}
