import AppError from '../../errors/AppError'
import { academicSemesterNameCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester name and semester code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(403, 'Invalid Semester Code')
  }

  const result = await AcademicSemester.create(payload)

  return result
}

// get all semester
const getAllSemesterIntoDB = async () => {
  const result = await AcademicSemester.find({})

  return result
}

//get single semester
const getSingleSemesterIntoDB = async (semesterId: string) => {
  const result = await AcademicSemester.findById(semesterId)

  return result
}

// update single semester
const singleSemesterUpdateIntoDB = async (
  semesterId: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(403, 'Invalid semester code')
  }

  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: semesterId },
    payload,
    { new: true },
  )

  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllSemesterIntoDB,
  getSingleSemesterIntoDB,
  singleSemesterUpdateIntoDB,
}
