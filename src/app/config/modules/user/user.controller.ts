import { Request, Response } from 'express'
import { UserService } from './user.service'
import studentValidationSchema from './user.validation'

// create student
const createStudent = async (req: Request, res: Response) => {
  try {
    // Guardian Schema

    const studentData = req.body

    // Validate the data with jod
    const zodParseData = studentValidationSchema.parse(studentData)

    const result = await UserService.createStudentIntoDB(zodParseData)

    res.status(200).json({
      success: true,
      message: 'Student Create Successfully',
      data: result,
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
        error: err,
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
        error: err,
      })
    }
  }
}

// get all students
const getAllStudents = async (req: Request, res: Response) => {
  const result = await UserService.getAllStudents()

  res.status(200).json({
    success: true,
    message: 'Student Create Successfully',
    data: result,
  })
}

// get single student

const getSingleStudent = async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.getSingleStudent(id)

  res.status(200).json({
    success: true,
    message: 'Student Create Successfully',
    data: result,
  })
}
export const UserController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
}
