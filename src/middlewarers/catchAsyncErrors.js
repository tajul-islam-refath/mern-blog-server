/**
 * ===== To Handle Try Catch Errors =====
 * @param {function} controllerFunction
 * @returns
 */
const catchAsyncErrorHandle = (controllerFunction) => (req, res, next) => {
  Promise.resolve(controllerFunction(req, res, next)).catch(next);
};

export default catchAsyncErrorHandle;
