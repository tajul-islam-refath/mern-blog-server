const defaults = require("../config/queryParam.config");

const getPagination = ({
  totalItems = defaults.totalItems,
  page = defaults.page,
  limit = defaults.limit,
}) => {
  const totalPage = Math.ceil(totalItems / limit);
  const pagination = {
    page: parseInt(page),
    limit: parseInt(limit),
    totalItems,
    totalPage,
  };

  if (page < totalPage) {
    pagination.next = parseInt(page) + 1;
  }

  if (page > 1) {
    pagination.prev = parseInt(page) - 1;
  }

  return pagination;
};

module.exports = {
  getPagination,
};
