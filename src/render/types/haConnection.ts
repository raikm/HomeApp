// Generated by https://quicktype.io

export interface HaConnection {
  _handleMessage: HandleClose;
  _handleClose: HandleClose;
  options: Options;
  commandId: number;
  commands: Commands;
  eventListeners: EventListeners;
  closeRequested: boolean;
  socket: string;
  _ent: Ent;
}

export interface Ent {
  state: StateClass;
  refresh: HandleClose;
  subscribe: HandleClose;
}

export interface HandleClose {
  _custom: PurpleCustom;
}

export interface PurpleCustom {
  type: Type;
  display: string;
  _reviveId: number;
}

export enum Type {
  Function = "function",
}

export interface StateClass {
  "person.raik": PersonRaik;
  "sun.sun": SunSun;
  "sensor.connected_clients": SensorConnectedClients;
  "light.duc_s_room": LightDucSRoomClass;
  "light.living_space": LightDucSRoomClass;
  "light.master_bedroom": LightDucSRoomClass;
  "light.floor": LightDucSRoomClass;
  "zone.home": ZoneHome;
  "input_boolean.movie_mode": InputBooleanMovieMode;
  "binary_sensor.updater": BinarySensorUpdater;
  "media_player.apple_tv": MediaPlayerAppleTv;
  "automation.morning_plantlight_routine": AutomationEveningRoutine;
  "automation.plantlights_evening_routine": AutomationEveningRoutine;
  "automation.evening_routine": AutomationEveningRoutine;
  "automation.ipad_screen": AutomationEveningRoutine;
  "remote.living_room": MediaPlayerAppleTv;
  "switch.ipad": Switch;
  "switch.bf93fb91bf84f30c04a0iv": Switch;
  "switch.bf90d60f48f4ddc915lpmg": Switch;
  "weather.home": WeatherHome;
  "sensor.hp_officejet_pro_9010_series_black_cartridge": SensorHacsClass;
  "sensor.hp_officejet_pro_9010_series_cyan_cartridge": SensorHacsClass;
  "sensor.hp_officejet_pro_9010_series_magenta_cartridge": SensorHacsClass;
  "sensor.hp_officejet_pro_9010_series_yellow_cartridge": SensorHacsClass;
  "light.hue_mobil": PurpleLight;
  "light.standlamp": PurpleLight;
  "light.floor_middle": PurpleLight;
  "light.floor_left": PurpleLight;
  "light.floor_right": PurpleLight;
  "light.mirror_lamp": LightDiningLamp1;
  "light.bed_lamp": PurpleLight;
  "light.ducs_stand_lamp": PurpleLight;
  "light.hwr_lamp": LightDiningLamp1;
  "light.dining_lamp_1": LightDiningLamp1;
  "light.dining_lamp_2": LightDiningLamp1;
  "light.dining_lamp_3": LightDiningLamp1;
  "light.ducs_bed_lamp": PurpleLight;
  "script.shortcut_start_morning": AutomationEveningRoutine;
  "script.shortcut_evening_mode": AutomationEveningRoutine;
  "script.shortcut_night_mode": AutomationEveningRoutine;
  "script.shortcut_leave_home": AutomationEveningRoutine;
  "script.shortcut_back_home": AutomationEveningRoutine;
  "script.shortcut_movie_mode": AutomationEveningRoutine;
  "script.shortcut_plant_lights": AutomationEveningRoutine;
  "script.turn_on_projector": AutomationEveningRoutine;
  "script.turn_off_projector": AutomationEveningRoutine;
  "script.turn_on_apple_tv": AutomationEveningRoutine;
  "script.shortcut_cleanup": AutomationEveningRoutine;
  "script.shortcut_shower_mode": AutomationEveningRoutine;
  "media_player.lounge": MediaPlayer;
  "sensor.hue_dimmer_switch_1_battery_level": SensorHueDimmerSwitch1_BatteryLevelClass;
  "media_player.master_bathroom": MediaPlayer;
  "sensor.hp_officejet_pro_9010_series": PurpleSensor;
  "sensor.hacs": SensorHacsClass;
  "media_player.bathroom": MediaPlayerBathroom;
  "media_player.dining_room": MediaPlayer;
  "sensor.v2_event_549244_motion_last_triggered": PurpleSensor;
  "sensor.v2_event_549244_motion_illumination": PurpleSensor;
  "sensor.v2_event_549244_motion": SensorMotion;
  "sensor.v2_event_f9a6c0_motion_last_triggered": PurpleSensor;
  "sensor.v2_event_f9a6c0_motion_illumination": PurpleSensor;
  "sensor.v2_event_f9a6c0_motion": SensorMotion;
  "sensor.aq2_event_b6e325_motion_last_triggered": PurpleSensor;
  "sensor.aq2_event_b6e325_motion_illumination": PurpleSensor;
  "sensor.aq2_event_b6e325_motion": SensorMotion;
  "sensor.v1_cloud_7b4bf9_temperature": SensorV1Cloud7_B4Bf9;
  "sensor.v1_cloud_7b4bf9_humidity": SensorV1Cloud7_B4Bf9;
  "sensor.v1_cloud_7b4bf9_pressure": SensorV1Cloud7_B4Bf9;
  "binary_sensor.aq2_cloud_0863db_state": BinarySensorAq2Cloud05_A049State;
  "binary_sensor.aq2_cloud_0b069d_state": BinarySensorAq2Cloud05_A049State;
  "sensor.jsq_cloud_707983_humidity": SensorJsqCloud707983__;
  "sensor.jsq_cloud_707983_temperature": SensorJsqCloud707983__;
  "binary_sensor.aq2_cloud_0b0b2c_state": BinarySensorAq2Cloud05_A049State;
  "sensor.v3_cloud_552073_illumination": LightV3Cloud552073;
  "binary_sensor.aq2_cloud_105f40_state": BinarySensorAq2Cloud05_A049State;
  "binary_sensor.aq2_cloud_05a049_state": BinarySensorAq2Cloud05_A049State;
  "sensor.netatmo_my_home_weather_station_co2": SensorHueDimmerSwitch1_BatteryLevelClass;
  "sensor.netatmo_my_home_weather_station_humidity": SensorNetatmoMyHomeWeatherStation;
  "sensor.netatmo_my_home_weather_station_noise": SensorHacsClass;
  "sensor.netatmo_my_home_weather_station_pressure": SensorHueDimmerSwitch1_BatteryLevelClass;
  "sensor.netatmo_my_home_weather_station_outdoor_module_temperature": SensorNetatmoMyHomeWeatherStation;
  "sensor.netatmo_my_home_weather_station_outdoor_module_humidity": SensorNetatmoMyHomeWeatherStation;
  "sensor.netatmo_my_home_weather_station_outdoor_module_battery_percent": SensorHueDimmerSwitch1_BatteryLevelClass;
  "sensor.netatmo_my_home_weather_station_smart_anemometer_direction": PurpleSensor;
  "sensor.netatmo_my_home_weather_station_smart_anemometer_wind_strength": SensorNetatmoMyHomeWeatherStation;
  "sensor.netatmo_my_home_weather_station_smart_anemometer_battery_percent": SensorHueDimmerSwitch1_BatteryLevelClass;
  "sensor.netatmo_my_home_weather_station_temperature": SensorNetatmoMyHomeWeatherStation;
  "sensor.v1_cloud_7b4bf9": SensorV1Cloud7_B4Bf9;
  "sensor.aq2_cloud_105f40": BinarySensorAq2Cloud05_A049State;
  "sensor.aq2_cloud_05a049": BinarySensorAq2Cloud05_A049State;
  "sensor.aq2_cloud_0863db": BinarySensorAq2Cloud05_A049State;
  "sensor.aq2_cloud_0b069d": BinarySensorAq2Cloud05_A049State;
  "sensor.aq2_cloud_0b0b2c": BinarySensorAq2Cloud05_A049State;
  "light.v3_cloud_552073": LightV3Cloud552073;
  "light.plantlight_banana": LightDiningLamp1;
  "light.plantlight_monstera": LightDiningLamp1;
  "remote.broadlink_rm3_pro_remote": LightDiningLamp1;
  "switch.movie_mode": LightDiningLamp1;
  "persistent_notification.config_entry_discovery": PersistentNotification;
  "persistent_notification.1f86a2ce80c289bf9ce2d1736184316f": PersistentNotification;
  "persistent_notification.http_login": PersistentNotification;
}

export interface AutomationEveningRoutine {
  entity_id: string;
  state: RepeatEnum;
  attributes: PurpleAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface PurpleAttributes {
  last_triggered: null | string;
  mode: Mode;
  current: number;
  id?: string;
  friendly_name: string;
  icon?: string;
}

export enum Mode {
  Single = "single",
}

export interface Context {
  id: string;
  parent_id: null;
  user_id: null;
}

export enum RepeatEnum {
  Off = "off",
  On = "on",
}

export interface BinarySensorAq2Cloud05_A049State {
  entity_id: string;
  state: PurpleState;
  attributes: FluffyAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface FluffyAttributes {
  model: Model;
  firmware_version: null;
  hardware_version: HardwareVersion;
  magnet_sen_contact_state: boolean;
  friendly_name: string;
  device_class?: string;
}

export enum HardwareVersion {
  NAForCloudMode = "N/A for Cloud Mode",
}

export enum Model {
  LumiSensorMagnetAq2 = "lumi.sensor_magnet.aq2",
}

export enum PurpleState {
  On = "on",
  True = "True",
}

export interface BinarySensorUpdater {
  entity_id: string;
  state: RepeatEnum;
  attributes: BinarySensorUpdaterAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface BinarySensorUpdaterAttributes {
  release_notes: string;
  newest_version: string;
  friendly_name: string;
}

export interface InputBooleanMovieMode {
  entity_id: string;
  state: RepeatEnum;
  attributes: InputBooleanMovieModeAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface InputBooleanMovieModeAttributes {
  editable: boolean;
  friendly_name: string;
}

export interface PurpleLight {
  entity_id: string;
  state: string;
  attributes: LightBedLampAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface LightBedLampAttributes {
  min_mireds: number;
  max_mireds: number;
  supported_color_modes: SupportedColorMode[];
  friendly_name: string;
  supported_features: number;
  effect_list?: string[];
}

export enum SupportedColorMode {
  ColorTemp = "color_temp",
  Hs = "hs",
}

export interface LightDiningLamp1 {
  entity_id: string;
  state: string;
  attributes: LightDiningLamp1_Attributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface LightDiningLamp1_Attributes {
  supported_color_modes?: string[];
  friendly_name: string;
  supported_features: number;
  restored?: boolean;
}

export interface LightDucSRoomClass {
  entity_id: string;
  state: string;
  attributes: LightDucSRoomAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface LightDucSRoomAttributes {
  min_mireds: number;
  max_mireds: number;
  supported_color_modes: string[];
  entity_id?: string[];
  friendly_name: string;
  icon: string;
  supported_features: number;
  type: string;
  effect_list?: string[];
}

export interface LightV3Cloud552073 {
  entity_id: string;
  state: string;
  attributes: LightV3Cloud552073_Attributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface LightV3Cloud552073_Attributes {
  supported_color_modes?: string[];
  model: string;
  firmware_version: string;
  hardware_version: string;
  light_switch_status: boolean;
  motion_sen_illumination: number;
  state_value: boolean;
  friendly_name: string;
  supported_features?: number;
  unit_of_measurement?: string;
}

export interface MediaPlayerAppleTv {
  entity_id: string;
  state: RepeatEnum;
  attributes: MediaPlayerAppleTvAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface MediaPlayerAppleTvAttributes {
  friendly_name: string;
  supported_features: number;
}

export interface MediaPlayerBathroom {
  entity_id: string;
  state: string;
  attributes: MediaPlayerBathroomAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface MediaPlayerBathroomAttributes {
  volume_level: number;
  is_volume_muted: boolean;
  media_content_id: string;
  media_content_type: string;
  media_duration: number;
  media_position: number;
  media_position_updated_at: string;
  media_title: string;
  media_artist: string;
  media_album_name: string;
  shuffle: boolean;
  repeat: RepeatEnum;
  sonos_group: string[];
  queue_position: number;
  friendly_name: string;
  entity_picture: string;
  supported_features: number;
}

export interface MediaPlayer {
  entity_id: string;
  state: string;
  attributes: MediaPlayerDiningRoomAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface MediaPlayerDiningRoomAttributes {
  volume_level: number;
  is_volume_muted: boolean;
  media_content_type: string;
  shuffle: boolean;
  repeat: RepeatEnum;
  sonos_group: string[];
  friendly_name: string;
  supported_features: number;
}

export interface PersistentNotification {
  entity_id: string;
  state: string;
  attributes: PersistentNotification1F86A2Ce80C289Bf9Ce2D1736184316FAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface PersistentNotification1F86A2Ce80C289Bf9Ce2D1736184316FAttributes {
  title: string;
  friendly_name: string;
  message: string;
}

export interface PersonRaik {
  entity_id: string;
  state: string;
  attributes: PersonRaikAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface PersonRaikAttributes {
  editable: boolean;
  id: string;
  user_id: string;
  friendly_name: string;
}

export interface SensorMotion {
  entity_id: string;
  state: string;
  attributes: { [key: string]: string };
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface PurpleSensor {
  entity_id: string;
  state: string;
  attributes: SensorAq2EventB6E325MotionIlluminationAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface SensorAq2EventB6E325MotionIlluminationAttributes {
  friendly_name: string;
  icon: string;
}

export interface SensorConnectedClients {
  entity_id: string;
  state: string;
  attributes: SensorConnectedClientsAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface SensorConnectedClientsAttributes {
  unit_of_measurement: string;
  friendly_name: string;
}

export interface SensorHacsClass {
  entity_id: string;
  state: string;
  attributes: SensorHacsAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface SensorHacsAttributes {
  repositories?: Repository[];
  unit_of_measurement: string;
  friendly_name: string;
  icon: string;
}

export interface Repository {
  name: string;
  display_name: string;
  installed_version: string;
  available_version: string;
}

export interface SensorHueDimmerSwitch1_BatteryLevelClass {
  entity_id: string;
  state: string;
  attributes: SensorHueDimmerSwitch1_BatteryLevelAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface SensorHueDimmerSwitch1_BatteryLevelAttributes {
  unit_of_measurement: string;
  friendly_name: string;
  device_class: string;
}

export interface SensorJsqCloud707983__ {
  entity_id: string;
  state: string;
  attributes: SensorJsqCloud707983_HumidityAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface SensorJsqCloud707983_HumidityAttributes {
  model: string;
  firmware_version: string;
  hardware_version: HardwareVersion;
  humidifier_switch_status: boolean;
  environmen_relative_humidity: number;
  environmen_temperature: number;
  indicator__switch_status: boolean;
  state_value: boolean;
  unit_of_measurement: string;
  friendly_name: string;
  device_class: string;
}

export interface SensorNetatmoMyHomeWeatherStation {
  entity_id: string;
  state: string;
  attributes: SensorNetatmoMyHomeWeatherStationHumidityAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface SensorNetatmoMyHomeWeatherStationHumidityAttributes {
  unit_of_measurement: string;
  friendly_name: string;
  device_class?: string;
  Room: string;
  type: string;
  sensor_class: string;
  icon?: string;
}

export interface SensorV1Cloud7_B4Bf9 {
  entity_id: string;
  state: string;
  attributes: SensorV1Cloud7B4Bf9Attributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface SensorV1Cloud7B4Bf9Attributes {
  model: string;
  firmware_version: null;
  hardware_version: HardwareVersion;
  temperatur_temperature: number;
  temperatur_relative_humidity: number;
  temperatur_atmospheric_pressure: number;
  friendly_name: string;
  unit_of_measurement?: string;
  device_class?: string;
}

export interface SunSun {
  entity_id: string;
  state: string;
  attributes: SunSunAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface SunSunAttributes {
  next_dawn: string;
  next_dusk: string;
  next_midnight: string;
  next_noon: string;
  next_rising: string;
  next_setting: string;
  elevation: number;
  azimuth: number;
  rising: boolean;
  friendly_name: string;
}

export interface Switch {
  entity_id: string;
  state: string;
  attributes: SwitchBf90D60F48F4Ddc915LpmgAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface SwitchBf90D60F48F4Ddc915LpmgAttributes {
  friendly_name: string;
}

export interface WeatherHome {
  entity_id: string;
  state: string;
  attributes: WeatherHomeAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface WeatherHomeAttributes {
  temperature: number;
  humidity: number;
  pressure: number;
  wind_bearing: number;
  wind_speed: number;
  attribution: string;
  forecast: Forecast[];
  friendly_name: string;
}

export interface Forecast {
  condition: string;
  precipitation: number;
  temperature: number;
  templow: number;
  datetime: string;
  wind_bearing: number;
  wind_speed: number;
}

export interface ZoneHome {
  entity_id: string;
  state: string;
  attributes: ZoneHomeAttributes;
  last_changed: string;
  last_updated: string;
  context: Context;
}

export interface ZoneHomeAttributes {
  latitude: number;
  longitude: number;
  radius: number;
  passive: boolean;
  editable: boolean;
  friendly_name: string;
  icon: string;
}

export interface Commands {
  _custom: CommandsCustom;
}

export interface CommandsCustom {
  type: string;
  display: string;
  value: PurpleValue[];
  readOnly: boolean;
  fields: Fields;
}

export interface Fields {
  abstract: boolean;
}

export interface PurpleValue {
  key: number;
  value: ValueValue;
}

export interface ValueValue {
  resolve: HandleClose;
  reject: HandleClose;
  callback: HandleClose;
  subscribe: HandleClose;
  unsubscribe: HandleClose;
}

export interface EventListeners {
  _custom: EventListenersCustom;
}

export interface EventListenersCustom {
  type: string;
  display: string;
  value: FluffyValue[];
  readOnly: boolean;
  fields: Fields;
}

export interface FluffyValue {
  key: string;
  value: HandleClose[];
}

export interface Options {
  setupRetry: number;
  createSocket: HandleClose;
  auth: Auth;
}

export interface Auth {
  data: Data;
  _saveTokens: string;
}

export interface Data {
  hassUrl: string;
  clientId: null;
  expires: number;
  refresh_token: string;
  access_token: string;
  expires_in: number;
}
