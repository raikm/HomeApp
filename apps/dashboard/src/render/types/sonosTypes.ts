// Generated by https://quicktype.io

export interface Zone {
  uuid: string
  coordinator: Speaker
  members: Speaker[]
}

export interface Speaker {
  uuid: string
  state: State
  roomName: string
  coordinator: string
  groupState: GroupState
}

export interface GroupState {
  volume: number
  mute: boolean
}

export interface State {
  volume: number
  mute: boolean
  equalizer: Equalizer
  currentTrack: CurrentTrack
  nextTrack: NextTrack
  trackNo: number
  elapsedTime: number
  elapsedTimeFormatted: string
  playbackState: string
  playMode: PlayMode
}

export interface CurrentTrack {
  artist: string
  title: string
  album: string
  albumArtUri: string
  duration: number
  uri: string
  trackUri?: string
  type: string
  stationName: string
  absoluteAlbumArtUri?: string
}

export interface Equalizer {
  bass: number
  treble: number
  loudness: boolean
}

export interface NextTrack {
  artist?: string
  title?: string
  album?: string
  albumArtUri?: string
  duration: number
  uri?: string
}

export interface PlayMode {
  repeat: string
  shuffle: boolean
  crossfade: boolean
}