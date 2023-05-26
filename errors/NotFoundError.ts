import { RequestError } from './RequestError';

export class NotFoundError extends RequestError {
  constructor(message = 'Resource not found', statusCode = 404) {
    super(message, statusCode);
  }
}
