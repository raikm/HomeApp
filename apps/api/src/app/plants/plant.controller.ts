import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { MiFloraDevice } from '@raikm/domain-types'
import { Plant, PlantCreationParameters, PlantUpdateParameters } from './dto/index.js'
import { PlantService } from './plant.service.js'

@Controller({
  path: 'plants',
  version: '1'
})
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Post()
  @HttpCode(204)
  async create(@Body() parameters: PlantCreationParameters): Promise<Plant | null> {
    return await this.plantService.create(parameters)
  }

  // order is important to catch
  @Get('/discover/:duration')
  async findNewNearbySensors(@Param('duration') duration: number): Promise<MiFloraDevice[]> {
    return await this.plantService.findNewNearbySensors(duration)
  }

  @Get()
  async findAll(): Promise<Plant[]> {
    return await this.plantService.findAll()
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Plant | null> {
    return await this.plantService.find(id)
  }

  @Get('/blinking/:id')
  async blinking(@Param('id') id: string): Promise<void> {
    try {
      return await this.plantService.blinking(id)
    } catch (error: any) {
      throw new NotFoundException('Device not found')
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() parameters: PlantUpdateParameters
  ): Promise<Plant | null> {
    return await this.plantService.update(id, parameters)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.plantService.remove(id)
  }
}
