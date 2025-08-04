import { apiClient } from '@/lib/api'
import { linkHelper } from '@/lib/helpers'
import { API_ROUTES } from '@/lib/routes'

const getAllEvents = async () =>
  apiClient
    .url(
      linkHelper({
        href: API_ROUTES.events.index,
        isApiRoute: true,
      }),
    )
    .get()
    .json()

const storeEvent = async (data: FormData) =>
  apiClient
    .url(
      linkHelper({
        href: API_ROUTES.events.create,
        isApiRoute: true,
      }),
    )
    .post(data)
    .json()

export { getAllEvents, storeEvent }
