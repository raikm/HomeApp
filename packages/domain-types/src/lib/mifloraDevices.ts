export interface Peripheral {
  id: string
  uuid: string
  address: string
  addressType: string
  connectable: boolean
  scannable?: boolean
  rssi: number
  services: any
  mtu: any
  state: string
  _eventsCount: number
}

export interface MiFloraDevice {
  // _peripheral: Peripheral
  // _service: any
  // _firmwareCharacteristic: any
  // _modeCharacteristic: any
  // _dataCharacteristic: any
  name?: any
  address: string
  lastDiscovery: number
  isConnected: boolean
  type: string
}
