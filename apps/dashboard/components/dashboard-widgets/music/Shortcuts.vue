<template>
  <div>
    <div v-if="playlists.length !== 0" class="playlist-shortcuts-container-wrapper">
      <div class="playlist-shortcuts-container">
        <div
          class="playlist-cover-info-wrapper"
          @click="playPlaylist(playlist.uri)"
          :key="playlist.id"
          v-for="playlist in playlists"
        >
          <img class="playlist-cover" :src="playlist.images[0].url" alt />
          <div class="playlist-info">{{ playlist.name }}</div>
        </div>
      </div>

      <div id="stream-services">
        <buttonicon iconName="spotify" lableName="Spotify" />
        <buttonicon iconName="apple_music" lableName="Apple Music" />
      </div>
    </div>
    <div v-else class="service-info">
      Service not available
      <nv-button @click="requestAuthorization">Connect to Spotify</nv-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nvButton } from '@nevo/ui'
import axios from 'axios'
import { ref } from 'vue'
import { useStore } from '../../../store/index'

const store = useStore()

const playlists = ref([] as any) // TODO Typing

const refreshAccessToken = () => {
  let refresh_token = localStorage.getItem('spotify_refresh_token')
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    auth: {
      username: store.config?.spotify.client_id,
      password: store.config?.spotify.client_secret
    }
  }
  const data = {
    grant_type: 'refresh_token',
    redirect_uri: encodeURI(window.location.origin + '/'),
    // SettingsPage/Spotify/
    refresh_token: refresh_token,
    client_id: store.config?.spotify.client_id
  }
  axios
    .post('https://accounts.spotify.com/api/token', qs.stringify(data), headers)
    .then((response) => {
      if (response.data.access_token != undefined) {
        let access_token = response.data.access_token
        localStorage.setItem('spotify_access_token', access_token)
      }
      if (response.data.refresh_token != undefined) {
        let refresh_token = response.data.refresh_token
        localStorage.setItem('spotify_refresh_token', refresh_token)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const getAllPlaylists = () => {
  if (localStorage.getItem('spotify_access_token') == null) return
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
      'Content-Type': 'application/json'
    }
  }
  axios
    .get('https://api.spotify.com/v1/me/playlists', config)
    .then((response) => {
      if (response.data.items.length !== 0) {
        playlists.value = response.data.items
      }
    })
    .catch((error: any) => {
      if (error.status == 401) refreshAccessToken()
      else console.error(error)
    })
}

getAllPlaylists()

const requestAuthorization = () => {
  let url = 'https://accounts.spotify.com/authorize'
  url += '?client_id=' + store.config?.spotify.client_id
  url += '&response_type=code'
  url += '&redirect_uri=' + encodeURI(window.location.origin + '/')
  // SettingsPage/Spotify/
  url += '&show_dialog=true'
  url += '&scope=playlist-read-private'
  window.location.href = url
}

const playPlaylist = (uri: string) => {
  axios
    .get(`${store.config?.sonos.rest_url}/Living Room/spotify/now/spotify:user:${uri}`)
    .then(() => {})
    .catch((error) => console.error(error.message))
}
</script>

<style lang="scss">
.playlist-shortcuts-container-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: 100px 30% 10%;
}
.playlist-shortcuts-container {
  display: grid;
  grid-gap: 5px;
  //visible covers:
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-auto-flow: column;
  //hidden covers:
  grid-auto-columns: minmax(100px, 1fr);
  grid-template-rows: minmax(100px, 1fr);
  overflow-x: scroll;
  // max-width: 100%;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
}
.playlist-cover-info-wrapper {
  .playlist-cover {
    border-radius: 5px;
    height: 100%;
    width: 100%;
  }
  .playlist-info {
    font-size: small;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
#stream-services {
  justify-self: right;
  display: inline-flex;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 5%;
}
</style>
