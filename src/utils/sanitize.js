const sanitizeEmail = (email) => {
  return email.replace(/[^a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+/g, "");
};

module.exports = {
  sanitizeEmail,
};
