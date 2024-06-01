import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicDepartmentService } from './academicDepartment.service'

// create academic Department
const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartmentIntoDB(
    req.body,
  )

  sendResponse(res, {
    success: true,
    message: 'Academic Department Create Successfully!',
    data: result,
    statusCode: httpStatus.OK,
  })
})

// get all Department
const getAllDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.getAllAcademicDepartment()

  sendResponse(res, {
    success: true,
    message: 'Get All Department!',
    data: result,
    statusCode: httpStatus.OK,
  })
})

//get single Department
const getSingleDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.getSingleDepartment(
    req.params.departmentId,
  )

  sendResponse(res, {
    success: true,
    message: 'Get single Department!',
    data: result,
    statusCode: httpStatus.OK,
  })
})

//update single Department
const updateSingleDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.updateSingleDepartment(
    req.params.departmentId,
    req.body,
  )

  sendResponse(res, {
    success: true,
    message: 'Update single Department!',
    data: result,
    statusCode: httpStatus.OK,
  })
})

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateSingleDepartment,
}
