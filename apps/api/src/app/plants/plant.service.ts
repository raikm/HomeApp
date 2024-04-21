import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { randomUUID } from 'crypto'
import { Repository } from 'typeorm'
import { LocationEntity } from '../locations/entities/location.entity.js'
import { Plant, PlantCreationParameters, PlantUpdateParameters } from './dto/index.js'

import { MiFloraDevice } from '@raikm/domain-types'

// @ts-ignore
import miflora from 'miflora'
import { PlantEntity } from './entities/plant.entity.js'

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
    @InjectRepository(PlantEntity)
    private readonly plantRepository: Repository<PlantEntity>
  ) {}
  async create(parameters: PlantCreationParameters): Promise<Plant | null> {
    const location = await this.locationRepository.findOneBy({
      id: parameters.location?.id
    })

    let plant = this.plantRepository.create({
      id: randomUUID(),
      name: parameters.name,
      address: parameters.address,
      version: parameters.version
    })
    if (location != null) {
      plant.location = location
    }

    plant = await this.plantRepository.save(plant)

    return plant
  }

  async update(id: string, parameters: PlantUpdateParameters): Promise<Plant | null> {
    const existingPlant = await this.plantRepository.findOneBy({
      id: id
    })

    if (!existingPlant) {
      return null
    }
    const updatedPlant = Object.assign({}, existingPlant, parameters)
    const plant = this.plantRepository.save(updatedPlant)
    return plant
  }

  async remove(id: string): Promise<void> {
    await this.plantRepository.delete(id)
  }

  async find(id: string): Promise<Plant | null> {
    return await this.plantRepository.findOne({
      where: { id },
      relations: ['location']
    })
  }

  async findAll(): Promise<Plant[]> {
    return await this.plantRepository.find({
      relations: ['location']
    })
  }

  async findNewNearbySensors(duration: number): Promise<MiFloraDevice[]> {
    const plants = await this.plantRepository.find()
    const plantAddressesAlreadyAdded = plants.map((p) => p.address)
    const opts = {
      duration: duration,
      ignoreUnknown: false
    }
    let result = (await miflora.discover(opts)) as MiFloraDevice[]
    console.log(await miflora)
    result = result.map((d) => {
      const { name, address, lastDiscovery, isConnected, type } = d
      return { name, address, lastDiscovery, isConnected, type }
    })
    // only non added ones
    result = result.filter((d) => !plantAddressesAlreadyAdded.find((a) => a === d.address))

    return result
  }

  async blinking(address: string): Promise<void> {
    const discoverOptions = {
      addresses: [address],
      ignoreUnknown: false,
      duration: 10000
    }

    try {
      const devices = await miflora.discover(discoverOptions)
      const device = devices.find((entry: MiFloraDevice) => entry.address === address)

      if (device) {
        await device.connect()
        await device.blink()
      } else {
        throw new Error('Device not found')
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }
}
