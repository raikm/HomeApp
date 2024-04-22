import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './entities/location.entity.js';
import { LocationController } from './location.controller.js';
import { LocationService } from './location.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity]), LocationModule],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
