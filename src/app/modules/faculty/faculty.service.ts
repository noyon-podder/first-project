/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { FacultySearchableFields } from './faculty.constant'
import { TFaculty } from './faculty.interface'
import { Faculty } from './faculty.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'

// get all faculties
const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await facultyQuery.modelQuery

  return result
}

// get single faculty
const getSingleFacultiesFromDB = async (facultyId: string) => {
  const result =
    await Faculty.findById(facultyId).populate('academicDepartment')

  return result
}

// single faculty  update dynamically
const singleFacultyUpdateFromDB = async (
  facultyId: string,
  payload: Partial<TFaculty>,
) => {
  const { name, ...remainingFacultyData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Faculty.findByIdAndUpdate(facultyId, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

// delete faculty from db

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()

    const deleteFaculty = await Faculty.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      { new: true, session },
    )

    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faculty Delete Failed')
    }

    const userId = deleteFaculty.user

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User Delete Failed')
    }

    await session.commitTransaction()
    await session.endSession()

    return deleteFaculty
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}
export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultiesFromDB,
  singleFacultyUpdateFromDB,
  deleteFacultyFromDB,
}
