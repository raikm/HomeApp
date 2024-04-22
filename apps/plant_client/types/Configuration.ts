export type Configuration = {
  floor: number
  api: APIInformation
}

type APIInformation = {
  address: string
  port: number
  prefix: string
}
