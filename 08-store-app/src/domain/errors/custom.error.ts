export class CustomError extends Error {

  private constructor (public readonly statusCode: number, public readonly message: string) {
    super(message);
  }

  public static badRequest(message: string) {
    return new CustomError(400, message);
  }

  public static unauthorizedRequest(message: string) {
    return new CustomError(401, message);
  }

  public static notFoundRequest(message: string) {
    return new CustomError(404, message);
  }

  public static forbidenRequest(message: string) {
    return new CustomError(403, message);
  }

  public static internalServerRequest(message: string) {
    return new CustomError(500, message);
  }
}