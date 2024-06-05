import { UserServices } from './user.service'
import catchAsync from '../../utils/catchAsync'

// create student
const crateStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body

  const result = await UserServices.createStudentIntoDb(password, student)

  res.status(200).json({
    success: true,
    message: 'Student create successfully',
    data: result,
  })
})

// create student
const crateFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body

  const result = await UserServices.createFacultyIntoDB(password, faculty)

  res.status(200).json({
    success: true,
    message: 'Faculty create successfully',
    data: result,
  })
})

export const UserControllers = {
  crateStudent,
  crateFaculty,
}
