export interface Homeroom {
  entity_id: string
  state: string
  attributes: Attributes
  last_changed: string
  last_updated: string
  context: Context
}

export interface Attributes {
  min_mireds: number
  max_mireds: number
  supported_color_modes: string[]
  entity_id?: string[]
  friendly_name: string
  icon: string
  supported_features: number
  type: string
  effect_list?: string[]
}

export interface Context {
  id: string
  parent_id: null
  user_id: null
}
