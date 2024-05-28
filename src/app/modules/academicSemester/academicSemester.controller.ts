import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemesterData = req.body
  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDB(
      academicSemesterData,
    )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Semester Create Successfully',
    success: true,
    data: result,
  })
})

// get all semester
const getAllSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllSemesterIntoDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All Semester get Successfully!!',
    success: true,
    data: result,
  })
})

// get single semester
const getSingleSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getSingleSemesterIntoDB(
    req.params.id,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Single Semester get Successfully!!',
    success: true,
    data: result,
  })
})

// single semester update

const singleSemesterUpdate = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.singleSemesterUpdateIntoDB(
    req.params.id,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Single Semester get Successfully!!',
    success: true,
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester,
  singleSemesterUpdate,
}
