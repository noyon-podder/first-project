import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { FacultyServices } from './faculty.service'

// all faculties
const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faculty Retrive Successfully!!',
    data: result,
  })
})

// get single faculty
const getSingFaculty = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await FacultyServices.getSingleFacultiesFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Faculty Retrive Successfully!!',
    data: result,
  })
})

// single faculty update
const singleFacultyUpdated = catchAsync(async (req, res) => {
  const { id } = req.params
  const { faculty } = req.body

  const result = await FacultyServices.singleFacultyUpdateFromDB(id, faculty)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Update Successfully!!',
    data: result,
  })
})

// DELETE FACULTY
const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await FacultyServices.deleteFacultyFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Delete Successfully!!',
    data: result,
  })
})

export const FacultyControllers = {
  getAllFaculties,
  getSingFaculty,
  singleFacultyUpdated,
  deleteFaculty,
}
