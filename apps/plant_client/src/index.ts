import { Measurement, MiFloraDevice, Plant } from '@raikm/domain-types'
import fs from 'fs'
// @ts-ignore
import miflora from 'miflora'
import fetch from 'node-fetch'
import { PlantQueryData } from '../types/PlantQueryData.js'
import path from 'path'

async function getPlantsForDefinedFloor(): Promise<Plant[]> {
  const { address, port, prefix } = configuration.api

  const response = await fetch(`${address}:${port}/${prefix}/plants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const plants = (await response.json()) as unknown as Plant[]

  if (plants.length === 0) {
    console.error(`no plants for floor ${configuration.floor} found`)
    return process.exit(0)
  }
  return plants.filter((p) => p.location?.floor == configuration.floor)
}

async function readPlantData(plants: Plant[]) {
  console.log('start searching for miflora devices...')
  const addresses = plants.map((p) => p.address)

  const opts = {
    duration: 20000,
    ignoreUnknown: true,
    addresses: addresses
  }

  const devices = (await miflora.discover(opts)) as MiFloraDevice[]
  console.log(`${devices.length} found`)

  for (const device of devices) {
    const plant = plants.find((p) => p.address === device.address)
    console.log(`read data from ${plant?.name}: ${device.address}`)

    try {
      const data = (await (device as any).query()) as PlantQueryData
      console.log(data)
      await sendPlantDataToAPI(plant?.id, data)
    } catch (error) {
      console.error('Error occurred while querying device:', error)
    }
  }

  return process.exit(0)
}

async function sendPlantDataToAPI(plantId: string | undefined, data: PlantQueryData) {
  if (plantId == null) {
    console.error('Plant ID not defined for: ' + data.address)
    return
  }
  const { address, port, prefix } = configuration.api

  const measurement: Measurement = {
    plantId: plantId,
    battery: data.firmwareInfo.battery,
    soilFertility: data.sensorValues.fertility,
    soilMoisture: data.sensorValues.moisture,
    sunlight: data.sensorValues.lux,
    temperature: data.sensorValues.temperature,
    datetime: new Date()
  }

  console.log(
    'sending data to: ',
    `${address}:${port}/${prefix}/plants/${plantId}/addNewMeasurements`
  )

  const response = await fetch(
    `${address}:${port}/${prefix}/plants/${plantId}/addNewMeasurements`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(measurement)
    }
  )
  console.log(`Nachrichten Sendungstatus: ${response['status']}`)
  // response.json().then((body) => console.log(body))
}

const configurationPath = path.join(__dirname, 'configuration.json')
const configuration = JSON.parse(fs.readFileSync(configurationPath, 'utf8'))

const plants = await getPlantsForDefinedFloor()

if (plants.length !== 0) {
  await readPlantData(plants)
}
