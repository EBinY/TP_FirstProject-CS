const { post } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
const { tagArrayToString, emptyArray } = require("../function/functions");

module.exports = (req, res) => {
  const { tag, title, content, comment } = req.body;
  const accessTokenData = isAuthorized(req);
  // console.log("액세스토큰", accessTokenData);
  const tagMap = tagArrayToString(tag);
  const emptyCom = emptyArray(comment);

  if (accessTokenData === null) {
    return res.status(401).send({ data: null, message: "not authorized" });
  }

  post
    .create({
      userId: accessTokenData.id,
      tag: tagMap,
      title,
      content,
      //comment,
    })
    .then((data) => {
      return res.status(201).send({
        tag: tagMap,
        title,
        content,
        //comment: emptyCom,
        createdAt: data.dataValues.createdAt,
        message: "ok",
      });
    });
};
