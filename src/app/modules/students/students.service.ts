import { Student } from './students.model'

const getAllStudents = async () => {
  const result = await Student.find()
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })

  return result
}

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ _id: id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    })

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
