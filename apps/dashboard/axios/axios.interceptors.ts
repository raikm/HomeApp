import axios from 'axios'
import { useStore } from '~~/store'

export const useInterceptor = () => {
  const store = useStore()
  /**
   * Configure axios with error handling
   */
  axios.interceptors.response.use(
    async (request) => request,
    async (error) => {
      console.log(`Error interceptor: ${error}`)

      if (!axios.isAxiosError(error)) {
        return Promise.reject(error)
      }

      store.toastType = 'danger'
      if (error.response?.status === 404) {
        store.toastMessage =
          error.response.data &&
          error.response.data === typeof 'object' &&
          (error.response.data as Error).message != null
            ? (error.response.data as Error).message
            : error.message
      }

      if (error.response && error.response.status >= 500) {
        store.toastMessage =
          error.response.data &&
          error.response.data === typeof 'object' &&
          (error.response.data as Error).message != null
            ? (error.response.data as Error).message
            : error.message
      }

      setTimeout(() => {
        store.toastType = undefined
        store.toastMessage = undefined
      }, 5000)
    }
  )
}
