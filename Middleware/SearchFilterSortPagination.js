const SearchFilterSortPaginationMiddleware = (req, res, next) => {
  let query = {};
  if (req.query.search) {
    query["first_name"] = req.query.search;
  }
  let sort = {};
  if (req.query.sort) {
    sort["salary"] = req.query.sort == "asc" ? 1 : -1;
  }

  if (req.query.filter) {
    query["department"] = req.query.filter;
  }

  let { page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  const skip = (page - 1) * limit;
  req["new_query"] = { query, sort, page, limit, skip };
  next();
};
module.exports = { SearchFilterSortPaginationMiddleware };
