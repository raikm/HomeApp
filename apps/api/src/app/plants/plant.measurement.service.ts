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

    const soilFertilityPercentage = await this.calculateSoilFertilityPercentage(plant)
    const soilMoisturePercentage = await this.calculateSoilMoisturePercentage(plant)
    const sunlightPercentage = await this.calculateSunlightPercentage(plant)

    const temperature = await this.measurementRepository.findOne({
      where: { type: MeasurementType.TEMPERATURE, plant: plant },
      order: { datetime: 'DESC' }
    })

    if (
      battery == null ||
      soilFertilityPercentage == null ||
      soilMoisturePercentage == null ||
      sunlightPercentage == null ||
      temperature == null
    ) {
      throw new BadRequestException()
    }

    return new Measurement({
      plantId: plantId,
      battery: battery.value,
      soilFertility: soilFertilityPercentage,
      soilMoisture: soilMoisturePercentage,
      sunlight: sunlightPercentage,
      temperature: temperature.value,
      datetime: temperature.datetime
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
          datetime: temperature[index].datetime
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

  async getMeasurementRange(id: string, type: MeasurementType): Promise<MeasurementRange | null> {
    const plant = await this.plantRepository.findOneBy({
      id: id
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
      plantId: plant!.id
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

    const exisitngMeasurementRange = await this.measurementRangeRepository.findOne({
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
      console.log(_measurementRange)
      await this.measurementRangeRepository.save(_measurementRange)
    } else {
      const updatedMeasurementRange = Object.assign({}, exisitngMeasurementRange, measurementRange)
      console.log('updatedMeasurementRange', updatedMeasurementRange)
      await this.measurementRangeRepository.save(updatedMeasurementRange)
    }
  }

  private async calculateSoilFertilityPercentage(plant: PlantEntity): Promise<number> {
    const soilFertilityRaw = await this.measurementRepository.findOne({
      where: { type: MeasurementType.SOILFERTILITY, plant: plant },
      order: { datetime: 'DESC' }
    })

    const soilFertilityRange = await this.measurementRangeRepository.findOne({
      where: { type: MeasurementType.SOILFERTILITY, plant: plant }
    })

    if (soilFertilityRaw == null || soilFertilityRange == null) {
      return 0
    }

    return this.calculatePercentage(
      soilFertilityRaw!.value,
      soilFertilityRange!.min,
      soilFertilityRange!.max
    )
  }

  private async calculateSoilMoisturePercentage(plant: PlantEntity): Promise<number> {
    const soilMoistureRaw = await this.measurementRepository.findOne({
      where: { type: MeasurementType.SOILMOISTURE, plant: plant },
      order: { datetime: 'DESC' }
    })

    const soilMoistureRange = await this.measurementRangeRepository.findOne({
      where: { type: MeasurementType.SOILMOISTURE, plant: plant }
    })

    if (soilMoistureRaw == null || soilMoistureRange == null) {
      return 0
    }

    return this.calculatePercentage(
      soilMoistureRaw!.value,
      soilMoistureRange!.min,
      soilMoistureRange!.max
    )
  }

  private async calculateSunlightPercentage(plant: PlantEntity): Promise<number> {
    const sunlightRaw = await this.measurementRepository.findOne({
      where: { type: MeasurementType.SUNLIGHT, plant: plant },
      order: { datetime: 'DESC' }
    })

    const sunlightRange = await this.measurementRangeRepository.findOne({
      where: { type: MeasurementType.SUNLIGHT, plant: plant }
    })

    if (sunlightRaw == null || sunlightRange == null) {
      return 0
    }

    return this.calculatePercentage(sunlightRaw!.value, sunlightRange!.min, sunlightRange!.max)
  }

  private calculatePercentage(value: number, min: number, max: number) {
    return ((value - min) / (max - min)) * 100
  }
}
