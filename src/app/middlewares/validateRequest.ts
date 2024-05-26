import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

// check req.body data for all request

const validateRequest = (Schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      /**
       * if all data is ok than call next function
       * if here is error than go too catch()
       */
      await Schema.parseAsync({
        body: req.body,
      })

      next()
    } catch (error) {
      next(error)
    }
  }
}

export default validateRequest
