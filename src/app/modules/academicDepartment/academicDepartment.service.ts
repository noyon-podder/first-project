import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload)

  return result
}

// get all department
const getAllAcademicDepartment = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty')

  return result
}

// get single department
const getSingleDepartment = async (departmentID: string) => {
  const result =
    await AcademicDepartment.findById(departmentID).populate('academicFaculty')

  return result
}

// update single department

const updateSingleDepartment = async (
  departmentId: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: departmentId },
    payload,
    { new: true },
  )

  return result
}

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartment,
  getSingleDepartment,
  updateSingleDepartment,
}
