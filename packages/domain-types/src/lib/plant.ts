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
  time: Date
}

export interface MeasurementRange {
  id: string
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

export enum MeasurementType {
  BATTERY = 'BATTERY',
  SOILFERTILITY = 'SOILFERTILITY',
  SOILMOISTURE = 'SOILMOISTURE',
  TEMPERATURE = 'TEMPERATURE',
  SUNLIGHT = 'SUNLIGHT'
}

export enum MeasurementUnit {
  PERCENTAGE = '%',
  CONDUCTIVITY = 'µS/cm',
  CELSIUS = '°C',
  LUX = 'Lux'
}
