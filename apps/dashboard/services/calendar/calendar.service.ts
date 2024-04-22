import axios from 'axios'
import { Event, Item } from '~~/types/googleCalendarResults'
import config from '../../../../config.json'

export class CalendarService {
  // TODO wrap in try catch

  async getGoogleCalendars(): Promise<Item[]> {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('google_access_token')}` }
    }
    const response = await axios
      .get('https://www.googleapis.com/calendar/v3/users/me/calendarList', config)
      .catch((error: any) => {
        if (!axios.isAxiosError(error)) {
          return Promise.reject(error)
        }
        if (
          error.response?.status === 401 &&
          localStorage.getItem('google_refresh_token').length > 0
        ) {
          this.getGoogleRefreshToken()
        }

        // TODO try refresh token
        // if not working then logout and delet all tokens
      })

    return response.data.items
  }

  async getGoogleCalendarEvents(calendars: Item[], params: {}): Promise<Event[]> {
    let events: Event[] = []

    const filteredCalenders = calendars.filter((c) => {
      return c.id !== 'e_2_de#weeknum@group.v.calendar.google.com'
    })

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('google_access_token')}` },
      params: params
    }

    for (const calendar of filteredCalenders) {
      const response = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendar.id}/events`,
        config
      )

      const calendarColor = await this.getCalendarColor(calendar.id)
      const entries: Event[] = response.data.items.map((event) => ({
        ...event,
        calendarColor: calendarColor
      }))
      events = [...events, ...entries]
    }

    return events
  }
  async getTodayGoogleCalendarEvents(): Promise<Event[]> {
    const calendars = await this.getGoogleCalendars()

    const startDay = new Date(new Date()).toISOString()
    const endDay = new Date(new Date().setHours(23, 59, 59, 999)).toISOString()

    const params = {
      showDeleted: false,
      timeMin: startDay,
      timeMax: endDay
    }

    const dayEvents = await this.getGoogleCalendarEvents(calendars, params)
    return dayEvents
  }

  async getCalendarColor(calendarId: string): Promise<string> {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('google_access_token')}` }
    }

    const response = await axios.get(
      `https://www.googleapis.com/calendar/v3/users/me/calendarList/${calendarId}`,
      config
    )

    return response.data.backgroundColor
  }

  async getGoogleToken() {
    const configuration = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      params: {
        client_id: encodeURI(config.google_calendar.client_id),
        client_secret: encodeURI(config.google_calendar.client_secret),
        code: encodeURI(localStorage.getItem('google_access_code')),
        grant_type: 'authorization_code',
        redirect_uri: encodeURI('http://localhost:3000')
      }
    }

    const response = await axios.post('https://oauth2.googleapis.com/token', null, configuration)

    localStorage.setItem('google_access_token', response.data['access_token'])
    localStorage.setItem('google_refresh_token', response.data['refresh_token'])
  }

  async getGoogleRefreshToken() {
    const configuration = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      params: {
        client_id: encodeURI(config.google_calendar.client_id),
        client_secret: encodeURI(config.google_calendar.client_secret),
        refresh_token: encodeURI(localStorage.getItem('google_refresh_token')),
        grant_type: 'refresh_token'
      }
    }

    const response = await axios.post('https://oauth2.googleapis.com/token', null, configuration)
    localStorage.setItem('google_access_token', response['access_token'])
  }
}
