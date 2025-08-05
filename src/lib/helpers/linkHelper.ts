type LinkHelperProps = {
  isApiRoute?: boolean
  href: string
  params?: Record<string, string>
  queryParams?: Record<string, string>
  isExternal?: boolean
}

const linkHelper = ({
  href,
  params,
  queryParams,
  isExternal,
  isApiRoute,
}: LinkHelperProps) => {
  const url = isApiRoute
    ? new URL(href, import.meta.env.VITE_API_URL)
    : new URL(href)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.pathname = url.pathname.replace(`:${key}`, value)
    })
  }

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }

  return isExternal ? url.toString() : url.pathname
}

export { linkHelper }
