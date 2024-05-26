import { NextFunction, Request, RequestHandler, Response } from 'express'

// high order function create for don't repeat try catch block

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
  }
}

export default catchAsync
