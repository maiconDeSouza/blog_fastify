const standardMessage =
  'An unexpected error occurred on the server. Please try again or attempt later.'

export class AppError {
  public readonly message: string
  public readonly statusCode: number
  constructor(message = standardMessage, statusCode = 500) {
    this.message = message
    this.statusCode = statusCode
  }
}
