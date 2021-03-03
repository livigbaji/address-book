/**
 * Makes sure the only content-type passed in is application/json
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = (req, res, next) => {
  const ALLOWED = 'application/json';
  const contentType = req.get('content-type') || ALLOWED;
  if (contentType === ALLOWED) {
    return next();
  }

  return res.status(415).json({
    error: `Could not process output in requested content-type. Only '${ALLOWED}' is allowed`,
  });
};
