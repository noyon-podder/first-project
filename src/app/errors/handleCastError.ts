import mongoose from 'mongoose'
import { TErrorSources, TGenericResponse } from '../interface/error.interface'

const handleCastError = (err: mongoose.Error.CastError): TGenericResponse => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ]
  const statusCode = 400
  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  }
}

export default handleCastError
