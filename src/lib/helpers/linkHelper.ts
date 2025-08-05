type LinkHelperProps = {
  href: string
  params?: Record<string, string>
  queryParams?: Record<string, string>
  isApiRoute?: boolean
}

const linkHelper = ({
  href,
  params,
  queryParams,
  isApiRoute = false,
}: LinkHelperProps): string => {
  let path = href

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replace(`:${key}`, value)
    }
  }

  const search = new URLSearchParams(queryParams || {}).toString()
  const finalPath = search ? `${path}?${search}` : path

  if (isApiRoute) {
    return `${import.meta.env.VITE_API_URL}${finalPath}`
  }

  return finalPath
}

export { linkHelper }
