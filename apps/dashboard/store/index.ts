import { defineStore } from 'pinia'
import { NevoConfig } from '../types/nevoConfig'
export interface State {
  config: NevoConfig | undefined
  spotifyAccessToken: string
  toastType: string | undefined
  toastMessage: string | undefined
}

export const useStore = defineStore('store', {
  state: (): State => {
    return {
      config: undefined,
      spotifyAccessToken: '',
      toastType: undefined,
      toastMessage: undefined
    }
  }
})
