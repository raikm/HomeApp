import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './locations/location.module.js';
import { MeasurementModule } from './plants/plant.measurement.module.js';
import { PlantModule } from './plants/plant.module.js';

@Module({
  imports: [
    PlantModule,
    LocationModule,
    MeasurementModule,

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'better-sqlite3',
        database: './database.sqlite',
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  providers: [],
})
export class AppModule {}
