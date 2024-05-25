import { Student } from './students.model'

const getAllStudents = async () => {
  const result = await Student.find({})

  return result
}

const getSingleStudent = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id: id } }])

  return result
}

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })

  return result
}

export const StudentsService = {
  getAllStudents,
  getSingleStudent,
  deleteStudentFromDB,
}
