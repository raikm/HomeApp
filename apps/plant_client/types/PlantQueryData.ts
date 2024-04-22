interface FirmwareInfo {
  battery: number
  firmware: string
}

interface SensorValues {
  temperature: number
  lux: number
  moisture: number
  fertility: number
}

export interface PlantQueryData {
  address: string
  type: string
  firmwareInfo: FirmwareInfo
  sensorValues: SensorValues
}
