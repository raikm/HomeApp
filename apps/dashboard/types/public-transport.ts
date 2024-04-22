export type PublicTransportProvider = 'BVG'

export interface Departure {
  tripId: string
  stop: StopOrDestination
  when: string
  plannedWhen: string
  delay: number
  platform?: null
  plannedPlatform?: null
  prognosisType: string
  direction: string
  provenance?: null
  line: Line
  remarks?: RemarksEntity[] | null
  origin?: null
  destination: StopOrDestination
  currentTripPosition: CurrentTripPosition
  occupancy: string
}
export interface StopOrDestination {
  type: string
  id: string
  name: string
  location: Location
  products: Products
  stationDHID: string
}
export interface Location {
  type: string
  id: string
  latitude: number
  longitude: number
}
export interface Products {
  suburban: boolean
  subway: boolean
  tram: boolean
  bus: boolean
  ferry: boolean
  express: boolean
  regional: boolean
}
export interface Line {
  type: string
  id: string
  fahrtNr: string
  name: string
  public: boolean
  adminCode: string
  productName: string
  mode: string
  product: string
  operator: Operator
  symbol: string
  nr: number
  metro: boolean
  express: boolean
  night: boolean
}
export interface Operator {
  type: string
  id: string
  name: string
}
export interface RemarksEntity {
  type: string
  code?: string | null
  text: string
  id?: string | null
  summary?: string | null
  icon?: Icon | null
  priority?: number | null
  products?: Products1 | null
  company?: string | null
  categories?: number[] | null
  validFrom?: string | null
  validUntil?: string | null
  modified?: string | null
}
export interface Icon {
  type: string
  title?: null
}
export interface Products1 {
  suburban: boolean
  subway: boolean
  tram: boolean
  bus: boolean
  ferry: boolean
  express: boolean
  regional: boolean
}
export interface CurrentTripPosition {
  type: string
  latitude: number
  longitude: number
}
