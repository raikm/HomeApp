export interface Location {
  id: string
  name: string
  floor: number
}

export interface LocationCreationParameters {
  name: string
  floor: number
}

export interface LocationUpdateParameters {
  name: string
  floor: number
}
