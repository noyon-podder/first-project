import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

// create academic faculty
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)

  return result
}

// get all academic faculties
const getAllFacultyIntoDB = async () => {
  const result = await AcademicFaculty.find()

  return result
}

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllFacultyIntoDB,
}
