// region Platform Libraries
import express from 'express';
// endregion

export abstract class ExpressController {
  // region S. Successes
  // 200
  static Ok<T>(res: express.Response, dto?: T): express.Response {
    if (dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    }
    return res.sendStatus(200);
  }

  // 201
  static Created(res: express.Response): express.Response {
    return res.sendStatus(201);
  }

  // 202
  static Accepted(res: express.Response): express.Response {
    return res.sendStatus(202);
  }
  // endregion

  // region E. Errors
  // 400
  static BadRequest(res: express.Response, message?: string | null): express.Response {
    return res.status(400).send(message);
  }

  // 401
  static Unauthorized(res: express.Response, message?: string): express.Response {
    return ExpressController.JsonResponse(res, 401, message || 'Unauthorized');
  }

  // 403
  static Forbidden(res: express.Response, message?: string): express.Response {
    return ExpressController.JsonResponse(res, 403, message || 'Forbidden');
  }

  // 404
  static NotFound(res: express.Response, message?: string): express.Response {
    return ExpressController.JsonResponse(res, 404, message || 'Not found');
  }

  // 406
  static NotAcceptable(res: express.Response, message?: string): express.Response {
    return ExpressController.JsonResponse(res, 406, message || 'Not acceptable');
  }

  // 409
  static Conflict(res: express.Response, message?: string): express.Response {
    return ExpressController.JsonResponse(res, 409, message || 'Conflict');
  }

  // 429
  static TooMany(res: express.Response, message?: string): express.Response {
    return ExpressController.JsonResponse(res, 429, message || 'Too many requests');
  }

  // 500
  static InternalServerError(res: express.Response, error: Error | string): express.Response {
    return res.status(500).json({ message: error.toString() });
  }
  // endregion

  static JsonResponse(res: express.Response, code: number, message: string): express.Response {
    return res.status(code).json({ message });
  }
}
