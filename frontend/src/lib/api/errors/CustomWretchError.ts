import { WretchError } from 'wretch/resolver'

class CustomWretchError extends WretchError {
  constructor({
    message = 'An error occurred',
    status = 500,
    stack = new Error().stack,
  }: {
    message?: string
    status?: number
    stack?: string
  } = {}) {
    super(message)
    this.name = 'CustomWretchError'
    this.status = status
    this.stack = stack || new Error().stack
    this.message = message
  }
}

export { CustomWretchError }
