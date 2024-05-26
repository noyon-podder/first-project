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

export const AcademicSemesterControllers = {
  createAcademicSemester,
}
