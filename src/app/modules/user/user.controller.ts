import { Request, Response } from 'express'
import { UserServices } from './user.service'

const crateStudent = async (req: Request, res: Response) => {
  try {
    const { password, student } = req.body

    const result = await UserServices.createStudentIntoDb(password, student)

    res.status(200).json({
      success: true,
      message: 'Student create successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const UserControllers = {
  crateStudent,
}
