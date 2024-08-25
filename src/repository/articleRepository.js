const ArticleModel = require("../models/Article");
const BaseRepository = require("./baseRepository");

class ArticleRepository extends BaseRepository {
  constructor() {
    super(ArticleModel);
  }

  /**
   * Find By Author
   * @param {authorId} authorId - Author id
   * @returns {array} Author all articles
   */
  findByAuthor = (authorId, query) => {
    return ArticleModel.aggregate([
      // sort stage
      {
        $sort: { updatedAt: -1 },
      },
      // search stage
      {
        $match: {
          author: authorId,
          $or: [
            { title: { $regex: query.search, $options: "i" } },
            { tags: { $in: [query.search] } },
          ],
        },
      },
      // slip items
      { $skip: query.page * query.limit - query.limit },
      // limit stage
      {
        $limit: query.limit,
      },

      // project stage -> format each document
      {
        $project: {
          _id: 1,
          title: 1,
          tags: 1,
          createdAt: 1,
          readTime: 1,
          cover: 1,
        },
      },
    ]);
  };

  /**
   * Find All
   * @returns {array} article array
   */
  // findAll = (query) => {
  //   return ArticleModel.aggregate([
  //     // sort stage
  //     {
  //       $sort: { updatedAt: -1 },
  //     },
  //     // search stage
  //     {
  //       $match: {
  //         $or: [
  //           { title: { $regex: query.search, $options: "i" } },
  //           { tags: { $in: [query.search] } },
  //         ],
  //       },
  //     },
  //     // join with author
  //     {
  //       $lookup: {
  //         from: "users",
  //         localField: "author",
  //         foreignField: "_id",
  //         as: "author",
  //         pipeline: [
  //           {
  //             $project: {
  //               username: 1,
  //               profileImage: 1,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //     // remove field
  //     {
  //       $unwind: "$author",
  //     },
  //     // slip items
  //     { $skip: query.page * query.limit - query.limit },
  //     // limit stage
  //     {
  //       $limit: query.limit,
  //     },

  //     // project stage -> format each document
  //     {
  //       $project: {
  //         _id: 1,
  //         title: 1,
  //         tags: 1,
  //         createdAt: 1,
  //         readTime: 1,
  //         cover: 1,
  //         author: 1,
  //       },
  //     },
  //   ]);
  // };

  findAllWithAuthor = async (query = {}) => {
    const pipeline = [
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
      {
        $project: {
          _id: 1,
          title: 1,
          tags: 1,
          createdAt: 1,
          readTime: 1,
          cover: 1,
          author: 1,
        },
      },
    ];
    query.pipeline = pipeline;
    return await this.findAll(query);
  };

  /**
   * Total articles by author
   * @param {*} search
   * @param {*} authorId
   * @returns
   */
  countByAuthor = (search, authorId) => {
    return ArticleModel.aggregate([
      // search stage
      {
        $match: {
          author: authorId,
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
}

module.exports = new ArticleRepository();
