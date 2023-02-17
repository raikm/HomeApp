import type { Measurement as IMeasurement } from '@nevo/domain-types';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class Measurement implements IMeasurement {
  @IsNotEmpty()
  @IsUUID()
  plantId!: string;

  @IsNotEmpty()
  battery!: number;

  @IsNotEmpty()
  soilFertility!: number;

  @IsNotEmpty()
  soilMoisture!: number;

  @IsNotEmpty()
  sunlight!: number;

  @IsNotEmpty()
  temperature!: number;

  constructor(init?: Measurement) {
    Object.assign(this, init);
  }
}
