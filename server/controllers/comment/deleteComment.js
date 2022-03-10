const { comment } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  const { commentId } = req.params;

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }
  comment.destroy({ where: { id: commentId } });
  return res.status(201).send({ message: "ok" });
};
