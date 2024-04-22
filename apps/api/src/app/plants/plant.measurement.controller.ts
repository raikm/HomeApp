import { Body, Controller, Get, HttpCode, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common'
import { MeasurementType } from '@raikm/domain-types'
import { Measurement } from './dto/plant.measurement.dto.js'
import { PlantMeasurementHistoryParameters } from './dto/plant.measurement.history.js'
import { MeasurementRangeCreationParameters } from './dto/plant.measurementRange.create.js'
import { MeasurementRange } from './dto/plant.measurementRange.dto.js'
import { MeasurementService } from './plant.measurement.service.js'

@Controller({
  path: '/plants',
  version: '1'
})
export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {}

  @Post('/:id/addNewMeasurements')
  @HttpCode(204)
  async create(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() parameters: Measurement
  ): Promise<void> {
    return await this.measurementService.putNewMeasurements(id, parameters)
  }

  @Get('/:id/getMeasurementRange/:type')
  async getMeasurementRange(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type') type: MeasurementType
  ): Promise<MeasurementRange | null> {
    return await this.measurementService.getMeasurementRange(id, type)
  }

  @Patch('/:id/addMeasurementRange')
  async updateMeasurementRange(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() parameters: MeasurementRangeCreationParameters
  ): Promise<void> {
    return await this.measurementService.putNewMeasurementRange(id, parameters)
  }

  @Get('/:id/lastMeasurements')
  async lastMeasurements(@Param('id', ParseUUIDPipe) id: string): Promise<Measurement> {
    return await this.measurementService.getLastMeasurements(id)
  }

  @Get('/:id/historyMeasurements')
  async historyMeasurements(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() parameters: PlantMeasurementHistoryParameters
  ): Promise<Measurement[]> {
    return await this.measurementService.getPlantMeasurmentsHistory(id, parameters)
  }
}
