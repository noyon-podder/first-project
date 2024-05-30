import { StudentsService } from './students.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'

// get all students
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentsService.getAllStudents()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Students Retrieve Successfully!!',
    data: result,
  })
})

// get single student
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentsService.getSingleStudent(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Students Retrieve Successfully!!',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params

  const result = await StudentsService.deleteStudentFromDB(studentId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student Delete Successfully!!',
    data: result,
  })
})

export const StudentsController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
