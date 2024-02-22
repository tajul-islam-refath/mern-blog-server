const sanitizeEmail = (email) => {
  // Use a library like DOMPurify for more robust sanitization
  return email.replace(/[^a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+/g, "");
};

module.exports = {
  sanitizeEmail,
};
