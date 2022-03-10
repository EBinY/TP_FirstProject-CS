const { comment } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  const { content } = req.body;
  const { id } = req.params;

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }

  comment
    .create({
      userId: accessTokenData.id,
      postId: id,
      content,
    })
    .then((data) => {
      return res.status(201).send({
        userId: accessTokenData.id,
        postId: id,
        content,
        message: "ok",
      });
    });
};