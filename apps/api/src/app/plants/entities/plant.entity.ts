import { MeasurementType } from '@raikm/domain-types'
import { IsNotEmpty } from 'class-validator'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation
} from 'typeorm'
import { LocationEntity } from '../../locations/entities/location.entity.js'

@Entity({
  name: 'plant'
})
class PlantEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'nvarchar' })
  name!: string

  @Column({ type: 'nvarchar' })
  address!: string

  @Column({ type: 'nvarchar' })
  version!: string

  @ManyToOne(() => LocationEntity, {
    createForeignKeyConstraints: false
  })
  location?: LocationEntity

  @OneToMany(() => MeasurementEntity, (measurement) => measurement.plant)
  measurement?: Relation<MeasurementEntity>[]

  @OneToMany(() => MeasurementRangeEntity, (measurementRange) => measurementRange.plant)
  measurementRange?: Relation<MeasurementEntity>[]

  constructor(props: any) {
    Object.assign(this, props)
  }
}

@Entity({
  name: 'measurement_range'
})
class MeasurementRangeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'nvarchar' })
  type!: MeasurementType

  @Column({ type: 'int' })
  min!: number

  @Column({ type: 'int' })
  max!: number

  @Column({ type: 'nvarchar' })
  unit!: string

  @ManyToOne(() => PlantEntity, (plant) => plant.id)
  @JoinColumn()
  plant?: PlantEntity

  constructor(props: any) {
    Object.assign(this, props)
  }
}

@Entity({
  name: 'measurement'
})
class MeasurementEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @IsNotEmpty()
  @Column({ type: 'nvarchar' })
  type!: string

  @IsNotEmpty()
  @Column({ type: 'int' })
  value!: number

  @IsNotEmpty()
  @Column({ type: 'nvarchar' })
  unit!: string

  @IsNotEmpty()
  @Column({ type: 'datetime' })
  datetime!: Date

  @ManyToOne(() => PlantEntity, (plant) => plant.id)
  @JoinColumn()
  plant?: PlantEntity

  constructor(props: any) {
    Object.assign(this, props)
  }
}

export { PlantEntity, MeasurementEntity, MeasurementRangeEntity }
