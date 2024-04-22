import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({
  name: 'location',
})
@Unique(['name'])
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'nvarchar' })
  name!: string;

  @Column({ type: 'int' })
  floor!: number;
}
