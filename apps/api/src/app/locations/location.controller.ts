import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type {
  LocationCreationParameters,
  LocationUpdateParameters,
} from '@nevo/domain-types';
import { Location } from './dto/location.dto.js';
import { LocationService } from './location.service.js';

@Controller({ path: '/location', version: '1' })
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @HttpCode(204)
  async create(
    @Body() locationCreationParameters: LocationCreationParameters,
  ): Promise<Location | null> {
    return await this.locationService.create(locationCreationParameters);
  }

  @Get()
  async findAll(): Promise<Location[]> {
    return await this.locationService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() locationUpdateParameters: LocationUpdateParameters,
  ): Promise<Location | null> {
    return await this.locationService.update(id, locationUpdateParameters);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.locationService.remove(id);
  }
}
