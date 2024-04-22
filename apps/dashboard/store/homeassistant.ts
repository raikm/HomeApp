import { Connection, HassEntities } from 'home-assistant-js-websocket'
import { defineStore } from 'pinia'
export interface HomeAssistantState {
  haEntities: HassEntities | undefined
  haConnection: Connection | undefined
}

export const useHomeAssistantStore = defineStore('homeassistant', {
  state: (): HomeAssistantState => {
    return {
      haEntities: undefined,
      haConnection: undefined
    }
  },
  getters: {
    shortcutEntities: (state) => {
      if (!state.haEntities) return
      return Object.values(state.haEntities).filter((entity) =>
        entity.entity_id.startsWith('script.shortcut_')
      )
    },
    homeclimateSensors: (state) => {
      if (!state.haEntities) return
      return Object.values(state.haEntities).filter((entity) => {
        return entity.attributes?.type === 'homeclimate'
      })
    },
    homerooms: (state) => {
      if (!state.haEntities) return
      return Object.values(state.haEntities).filter((entity: any) => {
        return entity.attributes?.type === 'room_group'
      })
    }
  }
})
