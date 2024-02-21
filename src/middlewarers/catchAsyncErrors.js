/**
 * ===== To Handle Try Catch Errors =====
 * @param {function} controllerFunction
 * @returns
 */
exports.catchAsyncErrorHandle = (controllerFunction) => (req, res, next) => {
  Promise.resolve(controllerFunction(req, res, next)).catch(next);
};
