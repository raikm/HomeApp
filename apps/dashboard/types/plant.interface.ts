export interface Plant {
  battery: number
  soil_fertility: number
  soil_moisture: number
  sunlight: number
  temperature: string
  timestamp: string
  id: number
  name: string
  address: string
  version: string
  location: Location
  soil_fertitlity_borders: Borders
  soil_moisture_borders: Borders
  sunlight_intensity_borders: Borders
  temperature_borders: Borders
}

export interface Location {
  location: string
  location_floor: number
  location_details: string
}

export interface Borders {
  unit: string
  min: number
  max: number
}
