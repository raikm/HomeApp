<template>
  <div class="settings-container">
    <nv-button :disabled="!isReady" @click="() => login()">Login with Google</nv-button>
  </div>
</template>

<script lang="ts" setup>
import { nvButton } from '@nevo/ui'
import {
  useCodeClient,
  type ImplicitFlowErrorResponse,
  type ImplicitFlowSuccessResponse
} from 'vue3-google-signin'
import { useCalendarService } from '../../services/calendar/index'

const calendarService = useCalendarService()

const handleOnSuccess = async (response: ImplicitFlowSuccessResponse) => {
  localStorage.setItem('google_access_code', response.code)
  await calendarService.getGoogleToken()
}

const handleOnError = (errorResponse: ImplicitFlowErrorResponse) => {
  console.log('Error: ', errorResponse)
}

const { isReady, login } = useCodeClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError
})
</script>
