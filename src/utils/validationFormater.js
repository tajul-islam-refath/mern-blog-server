module.exports = (error) => {
  return {
    field: error.path,
    message: error.msg,
  };
};
