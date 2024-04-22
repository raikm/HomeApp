import { Module } from '@nestjs/common';
import { PlantEntity } from './entities/plant.entity.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from '../locations/entities/location.entity.js';
import { PlantController } from './plant.controller.js';
import { PlantService } from './plant.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([PlantEntity, LocationEntity])],
  controllers: [PlantController],
  providers: [PlantService],
  exports: [PlantService],
})
export class PlantModule {}
