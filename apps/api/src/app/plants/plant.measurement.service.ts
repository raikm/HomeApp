import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MeasurementType, MeasurementUnit } from '@raikm/domain-types'
import { randomUUID } from 'crypto'
import { Between, Repository } from 'typeorm'
import { Measurement } from './dto/index.js'
import { PlantMeasurementHistoryParameters } from './dto/plant.measurement.history.js'
import { MeasurementRangeCreationParameters } from './dto/plant.measurementRange.create.js'
import { MeasurementRange } from './dto/plant.measurementRange.dto.js'
import { MeasurementEntity, MeasurementRangeEntity, PlantEntity } from './entities/plant.entity.js'

@Injectable()
export class MeasurementService {
  constructor(
    @InjectRepository(PlantEntity)
    private readonly plantRepository: Repository<PlantEntity>,
    @InjectRepository(MeasurementEntity)
    private readonly measurementRepository: Repository<MeasurementEntity>,
    @InjectRepository(MeasurementRangeEntity)
    private readonly measurementRangeRepository: Repository<MeasurementRangeEntity>
  ) {}

  async getLastMeasurements(plantId: string): Promise<Measurement> {
    const plant = await this.plantRepository.findOneBy({
      id: plantId
    })

    if (!plant) {
      throw new BadRequestException()
    }

    const battery = await this.measurementRepository.findOne({
      where: { type: MeasurementType.BATTERY, plant: plant },
      order: { datetime: 'DESC' }
    })

    const soilFertility = await this.measurementRepository.findOne({
      where: { type: MeasurementType.SOILFERTILITY, plant: plant },
      order: { datetime: 'DESC' }
    })

    const soilMoisture = await this.measurementRepository.findOne({
      where: { type: MeasurementType.SOILMOISTURE, plant: plant },
      order: { datetime: 'DESC' }
    })

    const sunlight = await this.measurementRepository.findOne({
      where: { type: MeasurementType.SUNLIGHT, plant: plant },
      order: { datetime: 'DESC' }
    })

    const temperature = await this.measurementRepository.findOne({
      where: { type: MeasurementType.TEMPERATURE, plant: plant },
      order: { datetime: 'DESC' }
    })

    if (
      battery == null ||
      soilFertility == null ||
      soilMoisture == null ||
      sunlight == null ||
      temperature == null
    ) {
      throw new BadRequestException()
    }

    return new Measurement({
      plantId: plantId,
      battery: battery.value,
      soilFertility: soilFertility.value,
      soilMoisture: soilMoisture.value,
      sunlight: sunlight.value,
      temperature: temperature.value,
      time: temperature.datetime
    })
  }

  async getPlantMeasurmentsHistory(plantId: string, parameters: PlantMeasurementHistoryParameters) {
    const start = parameters.start
    const end = parameters.end

    const plant = await this.plantRepository.findOneBy({
      id: plantId
    })

    if (!plant) {
      throw new BadRequestException()
    }

    const battery = await this.measurementRepository.find({
      where: {
        type: MeasurementType.BATTERY,
        plant: plant,
        datetime: Between(start, end)
      },
      order: { datetime: 'DESC' }
    })

    const soilFertility = await this.measurementRepository.find({
      where: {
        type: MeasurementType.SOILFERTILITY,
        plant: plant,
        datetime: Between(start, end)
      },
      order: { datetime: 'DESC' }
    })

    const soilMoisture = await this.measurementRepository.find({
      where: {
        type: MeasurementType.SOILMOISTURE,
        plant: plant,
        datetime: Between(start, end)
      },
      order: { datetime: 'DESC' }
    })

    const sunlight = await this.measurementRepository.find({
      where: {
        type: MeasurementType.SUNLIGHT,
        plant: plant,
        datetime: Between(start, end)
      },
      order: { datetime: 'DESC' }
    })

    const temperature = await this.measurementRepository.find({
      where: {
        type: MeasurementType.TEMPERATURE,
        plant: plant,
        datetime: Between(start, end)
      },
      order: { datetime: 'DESC' }
    })

    const measurements: Measurement[] = []
    for (let index = 0; index <= battery.length - 1; index++) {
      measurements.push(
        new Measurement({
          plantId: plantId,
          battery: battery[index].value,
          soilFertility: soilFertility[index].value,
          soilMoisture: soilMoisture[index].value,
          sunlight: sunlight[index].value,
          temperature: temperature[index].value,
          time: temperature[index].datetime
        })
      )
    }

    return measurements
  }

  async putNewMeasurements(plantId: string, measurements: Measurement): Promise<void> {
    const plant = await this.plantRepository.findOneBy({
      id: plantId
    })

    if (!plant) {
      throw new BadRequestException()
    }

    let measurement = this.measurementRepository.create({
      id: randomUUID(),
      type: MeasurementType.BATTERY,
      value: measurements.battery,
      unit: MeasurementUnit.PERCENTAGE,
      datetime: new Date(),
      plant: plant
    })

    measurement = await this.measurementRepository.save(measurement)

    measurement = this.measurementRepository.create({
      id: randomUUID(),
      type: MeasurementType.SOILFERTILITY,
      value: measurements.soilFertility,
      unit: MeasurementUnit.CONDUCTIVITY,
      datetime: new Date(),
      plant: plant
    })

    measurement = await this.measurementRepository.save(measurement)

    measurement = this.measurementRepository.create({
      id: randomUUID(),
      type: MeasurementType.SOILMOISTURE,
      value: measurements.soilMoisture,
      unit: MeasurementUnit.PERCENTAGE,
      datetime: new Date(),
      plant: plant
    })

    measurement = await this.measurementRepository.save(measurement)

    measurement = this.measurementRepository.create({
      id: randomUUID(),
      type: MeasurementType.SUNLIGHT,
      value: measurements.sunlight,
      unit: MeasurementUnit.LUX,
      datetime: new Date(),
      plant: plant
    })

    measurement = await this.measurementRepository.save(measurement)

    measurement = this.measurementRepository.create({
      id: randomUUID(),
      type: MeasurementType.TEMPERATURE,
      value: measurements.temperature,
      unit: MeasurementUnit.CELSIUS,
      datetime: new Date(),
      plant: plant
    })

    await this.measurementRepository.save(measurement)
  }

  async getMeasurementRange(
    plantId: string,
    type: MeasurementType
  ): Promise<MeasurementRange | null> {
    const plant = await this.plantRepository.findOneBy({
      id: plantId
    })

    if (!plant) {
      throw new BadRequestException()
    }

    const measurementRangeEntity = await this.measurementRangeRepository.findOne({
      where: { type: type, plant: plant }
    })

    if (measurementRangeEntity == null) {
      throw new BadRequestException()
    }

    return new MeasurementRange({
      id: measurementRangeEntity.id,
      type: measurementRangeEntity.type,
      unit: measurementRangeEntity.unit,
      min: measurementRangeEntity.min,
      max: measurementRangeEntity.max,
      plantId: measurementRangeEntity.plant!.id
    })
  }

  async putNewMeasurementRange(
    plantId: string,
    measurementRange: MeasurementRangeCreationParameters
  ): Promise<void> {
    const plant = await this.plantRepository.findOneBy({
      id: plantId
    })

    if (!plant) {
      throw new BadRequestException()
    }

    const exisitngMeasurementRange = this.measurementRangeRepository.findOne({
      where: { type: measurementRange.type, plant: plant }
    })

    if (exisitngMeasurementRange == null) {
      const _measurementRange = this.measurementRangeRepository.create({
        id: randomUUID(),
        type: measurementRange.type,
        min: measurementRange.min,
        max: measurementRange.max,
        unit: measurementRange.unit,
        plant: plant
      })
      await this.measurementRangeRepository.save(_measurementRange)
    } else {
      const updatedMeasurementRange = Object.assign({}, exisitngMeasurementRange, measurementRange)
      await this.measurementRangeRepository.save(updatedMeasurementRange)
    }
  }
}
