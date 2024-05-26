import { UserServices } from './user.service'
import catchAsync from '../../utils/catchAsync'

const crateStudent = catchAsync(async (req, res, next) => {
  const { password, student } = req.body

  const result = await UserServices.createStudentIntoDb(password, student)

  res.status(200).json({
    success: true,
    message: 'Student create successfully',
    data: result,
  })
})

export const UserControllers = {
  crateStudent,
}
