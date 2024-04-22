import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MeasurementEntity,
  MeasurementRangeEntity,
  PlantEntity,
} from './entities/plant.entity.js';
import { MeasurementController } from './plant.measurement.controller.js';
import { MeasurementService } from './plant.measurement.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlantEntity,
      MeasurementEntity,
      MeasurementRangeEntity,
    ]),
  ],
  controllers: [MeasurementController],
  providers: [MeasurementService],
  exports: [MeasurementService],
})
export class MeasurementModule {}
