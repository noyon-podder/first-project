import { Request, Response } from 'express'
import { StudentsService } from './students.service'

// get all students
const getAllStudents = async (req: Request, res: Response) => {
  const result = await StudentsService.getAllStudents()

  res.status(200).json({
    success: true,
    message: 'Student Create Successfully',
    data: result,
  })
}

// get single student

const getSingleStudent = async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await StudentsService.getSingleStudent(id)

  res.status(200).json({
    success: true,
    message: 'Student Create Successfully',
    data: result,
  })
}

const deleteStudent = async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await StudentsService.deleteStudentFromDB(id)

  res.status(200).json({
    success: true,
    message: 'Student Create Successfully',
    data: result,
  })
}
export const StudentsController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
