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
}

export default QueryBuilder
