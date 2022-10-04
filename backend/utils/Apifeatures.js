class Apifeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing some fields for Category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // filter for price and rating

    let queryStry = JSON.stringify(queryCopy);

    queryStry = queryStry.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStry));

    return this;
  }

  pagination(resultPerpage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerpage * (currentPage - 1);

    this.query = this.query.limit(resultPerpage).skip(skip);

    return this;
  }
}

module.exports = Apifeatures;
