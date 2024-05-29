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

export const AcademicFacultyControllers = {
  createAcademicFaculty,
}
