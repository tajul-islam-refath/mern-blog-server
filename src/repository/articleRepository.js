const ArticleModel = require("../models/Article");

class ArticleRepository {
  /**
   * Find By ID
   * @param {string} _id
   * @returns {article} article
   */
  findByID = (_id, select = {}, populateOptions = []) => {
    return ArticleModel.findById(_id, select).populate(populateOptions);
  };
  /**
   * Find By Author
   * @param {_id} _id - Author _id
   * @returns {array} Author all articles
   */
  findByAuthor = (_id, select = {}) => {
    return ArticleModel.find({ author: _id }, select);
  };
  /**
   * Find One
   * @param {query} query
   * @returns {article} article
   */
  findOne = (query = {}, select = {}) => {
    return ArticleModel.findOne(query, select);
  };
  /**
   * Find All
   * @returns {array} article array
   */
  findAll = (query) => {
    return ArticleModel.aggregate([
      // search stage
      {
        $match: {
          $or: [
            { title: { $regex: query.search, $options: "i" } },
            { tags: { $in: [query.search] } },
          ],
        },
      },
      // populate author
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
          pipeline: [
            {
              $project: {
                username: 1,
                profileImage: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$author",
      },
      // limit stage
      {
        $limit: query.limit,
      },
      // sort stage
      {
        $sort: { updatedAt: -1 },
      },
      // project stage format each document
      {
        $project: {
          _id: 1,
          title: 1,
          tags: 1,
          createdAt: 1,
          readTime: 1,
          author: 1,
        },
      },
    ]);
  };
  count = (search) => {
    return ArticleModel.aggregate([
      // search stage
      {
        $match: {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { tags: { $in: [search] } },
          ],
        },
      },
      {
        $count: "total",
      },
    ]);
  };
  /**
   * Create
   * @param {object} data
   * @returns {object} article object
   */
  create = (data) => {
    return ArticleModel.create(data);
  };
  /**
   * findByIdAndUpdate
   * @param {_id} _id - Article _id
   * @param {object} updatedData
   * @returns {object} updated article object
   */
  findByIdAndUpdate = (_id, updatedData) => {
    return ArticleModel.findByIdAndUpdate(
      _id,
      {
        $set: updatedData,
      },
      { new: true }
    );
  };
  deleteById = (_id) => {
    return ArticleModel.findByIdAndDelete(_id);
  };
  deleteMany = (query) => {
    return ArticleModel.deleteMany(query);
  };
}

module.exports = new ArticleRepository();
