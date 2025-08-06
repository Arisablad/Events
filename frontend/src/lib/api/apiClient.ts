import { ResponseCodeEnum } from '@/enums'
import wretch from 'wretch'
import { CustomWretchError } from './errors'

const apiClient = wretch()
  .url(import.meta.env.VITE_API_URL)
  .middlewares([
    (next) => (url, opts) => {
      const token = localStorage.getItem('token')
      if (token) {
        opts.headers = {
          ...opts.headers,
          Authorization: `Bearer ${token}`,
        }
      }

      if (
        opts.headers &&
        opts.body instanceof FormData &&
        (opts.headers as Record<string, string>)['Content-Type']
      ) {
        delete (opts.headers as Record<string, string>)['Content-Type']
      }

      return next(url, opts)
    },
  ])
  .catcher(ResponseCodeEnum.UNAUTHORIZED, (error) => {
    throw new CustomWretchError({
      message: 'Unauthorized access. Please log in again.',
      status: ResponseCodeEnum.UNAUTHORIZED,
      stack: error.stack,
    })
  })

export { apiClient }
