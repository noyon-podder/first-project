import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

// find last student

const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    { role: 'student' },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()

  // 2024010001
  return lastStudent?.id ? lastStudent.id : undefined
}

// generate student id
export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString()

  const lastStudentId = await findLastStudent() // demoId: 2030010001
  const lastStudentYear = await lastStudentId?.substring(0, 4) // 2030
  const lastStudentCode = await lastStudentId?.substring(4, 6) //01

  const currentStudentYear = payload.year
  const currentStudentCode = payload.code

  if (
    lastStudentId &&
    lastStudentYear === currentStudentYear &&
    lastStudentCode === currentStudentCode
  ) {
    currentId = lastStudentId.substring(6)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')

  incrementId = `${payload.year}${payload.code}${incrementId}`

  return incrementId
}
