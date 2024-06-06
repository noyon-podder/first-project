import { UserServices } from './user.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

// create student
const crateStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body

  const result = await UserServices.createStudentIntoDb(password, student)

  res.status(200).json({
    success: true,
    message: 'Student create successfully',
    data: result,
  })
})

// create Faculty
const crateFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body

  const result = await UserServices.createFacultyIntoDB(password, faculty)

  res.status(200).json({
    success: true,
    message: 'Faculty create successfully',
    data: result,
  })
})

// create admin
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body

  const result = await UserServices.createAdminIntoDB(password, adminData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  })
})

export const UserControllers = {
  crateStudent,
  crateFaculty,
  createAdmin,
}
