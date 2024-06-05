import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  // method declare for search
  search(searchableFields: string[]) {
    if (this?.query?.searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: this?.query?.searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      })
    }
    return this
  }

  // method declare for filter
  filter() {
    const queryFields = { ...this.query }

    const removeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']

    removeFields.forEach((el: string) => delete queryFields[el])

    this.modelQuery = this.modelQuery.find(queryFields as FilterQuery<T>)

    return this
  }

  // method declare for sort
  sort() {
    const sort = this?.query?.sort || '-createdAt'
    this.modelQuery = this.modelQuery.sort(sort as string)

    return this
  }

  // paginate method declare for pagination
  paginate() {
    const page = Number(this?.query?.page) || 1
    const limit = Number(this?.query?.limit) || 3
    const skip = (page - 1) * limit || 0

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)
    return this
  }

  // fields method declare for remove field in user response
  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v'

    this.modelQuery = this.modelQuery.select(fields)
    return this
  }
}

export default QueryBuilder
