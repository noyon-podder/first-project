import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicFacultyServices } from './academicFaculty.service'

// create academic Faculty
const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  )

  sendResponse(res, {
    success: true,
    message: 'Academic Faculty Create Successfully!',
    data: result,
    statusCode: httpStatus.OK,
  })
})

// get all faculty
const getAllFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllFacultyIntoDB()

  sendResponse(res, {
    success: true,
    message: 'Get All Faculty!',
    data: result,
    statusCode: httpStatus.OK,
  })
})

//get single faculty
const getSingleFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getSingleFacultyIntoDB(
    req.params.facultyId,
  )

  sendResponse(res, {
    success: true,
    message: 'Get single Faculty!',
    data: result,
    statusCode: httpStatus.OK,
  })
})

//update single faculty
const updateSingleFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.updateSingleFacultyIntoDB(
    req.params.facultyId,
    req.body,
  )

  sendResponse(res, {
    success: true,
    message: 'Update single Faculty!',
    data: result,
    statusCode: httpStatus.OK,
  })
})

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateSingleFaculty,
}
