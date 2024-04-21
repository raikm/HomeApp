import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LocationUpdateParameters } from '@raikm/domain-types'
import { randomUUID } from 'crypto'
import { Repository } from 'typeorm'
import { LocationCreationParameters } from './dto/location.create.js'
import { Location } from './dto/location.dto.js'
import { LocationEntity } from './entities/location.entity.js'

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>
  ) {}

  async create(parameters: LocationCreationParameters): Promise<Location | null> {
    const existingLocation = await this.locationRepository.findOneBy({
      name: parameters.name
    })
    if (existingLocation) {
      return null
    }

    let location = this.locationRepository.create({
      id: randomUUID(),
      name: parameters.name,
      floor: parameters.floor
    })

    location = await this.locationRepository.save(location)

    return location
  }

  async update(id: string, parameters: LocationUpdateParameters): Promise<Location | null> {
    const existingLocation = await this.locationRepository.findOneBy({
      id: id
    })

    if (!existingLocation) {
      return null
    }

    const updatedLocation = Object.assign({}, existingLocation, parameters)
    return updatedLocation
  }

  async findAll(): Promise<Location[]> {
    return await this.locationRepository.find()
  }

  async remove(id: string): Promise<void> {
    await this.locationRepository.delete(id)
  }
}
