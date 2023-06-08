import { RequestError } from "./RequestError";

export class BadRequestError extends RequestError {
  constructor(message = "Bad Request", statusCode = 400) {
    super(message, statusCode);
  }
}
