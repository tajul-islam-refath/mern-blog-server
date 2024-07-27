class BaseRepository {
  constructor(Model) {
    this.model = Model;
  }
  /**
   * Find By ID
   * @param {string} _id
   * @returns {article} article
   */
  findByID = (_id, select = {}, populateOptions = []) => {
    return this.model.findById(_id, select).populate(populateOptions);
  };

  /**
   * Find One
   * @param {query} query
   * @returns {article} article
   */
  findOne = (query = {}, select = {}) => {
    return this.model.findOne(query, select);
  };
  /**
   * Find All
   * @returns {array} article array
   */
  findAll = async (query = {}) => {
    console.log("BaseRepo", query);
    const {
      search = "",
      page = 1,
      limit = 10,
      sortField = "updatedAt",
      sortOrder = -1,
    } = query;

    const pipeline = [
      { $sort: { [sortField]: sortOrder } },
      {
        $match: {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { tags: { $in: [search] } },
          ],
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ];

    if (query.pipeline) {
      pipeline.push(...query.pipeline);
    }

    return await this.model.aggregate(pipeline);
  };

  /**
   * Total items
   * @param {*} search
   * @returns
   */
  count = (search) => {
    return this.model.aggregate([
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
   * Create New Item
   * @param {object} data
   * @returns {object} item object
   */
  create = (data) => {
    return this.model.create(data);
  };
  /**
   * findByIdAndUpdate
   * @param {_id} _id - item _id
   * @param {object} updatedData
   * @returns {object} updated item
   */
  findByIdAndUpdate = (_id, updatedData) => {
    return this.model.findByIdAndUpdate(
      _id,
      {
        $set: updatedData,
      },
      { new: true }
    );
  };
  deleteById = (_id) => {
    return this.model.findByIdAndDelete(_id);
  };
  deleteMany = (query) => {
    return this.model.deleteMany(query);
  };
}

module.exports = BaseRepository;
