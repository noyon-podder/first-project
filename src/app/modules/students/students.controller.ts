import { NextFunction, Request, Response } from 'express'
import { StudentsService } from './students.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

// get all students
const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentsService.getAllStudents()

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Students Retrieve Successfully!!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// get single student

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const result = await StudentsService.getSingleStudent(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Students Retrieve Successfully!!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id

    const result = await StudentsService.deleteStudentFromDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Delete Successfully!!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
export const StudentsController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
