import { Location } from './location.js'
export interface Plant {
  id: string
  name: string
  address: string
  version: string
  location?: Location
}
export interface PlantCreationParameters {
  name: string
  address: string
  version: string
  location?: Location
}
export interface PlantUpdateParameters {
  name: string
  location?: Location
}
export interface Measurement {
  plantId: string
  battery: number
  soilFertility: number
  soilMoisture: number
  sunlight: number
  temperature: number
  datetime: Date
}
export interface MeasurementRange {
  type: string
  unit: string
  min: number
  max: number
  plantId: string
}
export interface MeasurementRangeCreationParameters {
  type: string
  unit: string
  min: number
  max: number
  plantId: string
}
export interface PlantMeasurementHistoryParameters {
  start: Date
  end: Date
}
export declare enum MeasurementType {
  BATTERY = 'BATTERY',
  SOILFERTILITY = 'SOILFERTILITY',
  SOILMOISTURE = 'SOILMOISTURE',
  TEMPERATURE = 'TEMPERATURE',
  SUNLIGHT = 'SUNLIGHT'
}
export declare enum MeasurementUnit {
  PERCENTAGE = '%',
  CONDUCTIVITY = '\u00B5S/cm',
  CELSIUS = '\u00B0C',
  LUX = 'Lux'
}
//# sourceMappingURL=plant.d.ts.map
