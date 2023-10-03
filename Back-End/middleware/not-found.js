const notFound = (req, res) =>
  res.status(404).send("Route does not exist (ERROR 404)");

module.exports = notFound;
