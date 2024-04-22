export type NevoConfig = {
  aftership: Aftership;
  sonos: Sonos;
  homeassistant: Homeassistant;
  homeserver: Homeserver;
  api: any,
  weather: Weather;
  google_calendar: GoogleCalendar;
  public_transport: PublicTransport;
  spotify: Spotify;
}

export type Aftership = {
  api_key: string;
}

export type GoogleCalendar = {
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  api_key: string;
  scope: string;
  discovery_docs: string[];
}

export type Homeassistant = {
  hassUrl: string;
  life_time_token_raik: string;
}

export type Homeserver = {
  url: string;
}

export type PublicTransport = {
  websocketUrl: string;
  home_address: HomeAddress;
}

export type HomeAddress = {
  longitude: number;
  latitude: number;
  distance: number;
}

export type Sonos = {
  websocket_url: string;
  rest_url: string;
}

export type Spotify = {
  client_id: string;
  client_secret: string;
}

export type Weather = = {
  open_weather_url: string;
  api_key: string;
}
