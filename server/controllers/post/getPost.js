const { post, like, comment } = require("../../models");
const { tagStringToArray } = require("../function/functions");

module.exports = (req, res) => {
  // postList 저장
  post.findAll().then((data) => {
    const postList = data.map((item) => {
      const post = item.dataValues;
      const tagArray = tagStringToArray(post.tag);
      post["tag"] = tagArray;
      post["ddabong"] = "ok";
      return post;
    });

    // likeList 저장
    like.findAll().then((data) => {
      const likeList = data.map((item) => {
        return item.dataValues;
      });

      console.log("likeList", likeList);
      console.log("postList", postList);

      // commentList 저장
      // comment.findAll().then((data) => {
      //   console.log("데이터", data);
      //   const commentList = data.map((item) => {
      //     return item.dataValues;
      //   });
      // });
      // console.log("commentList", commentList);

      // postList[i]를 조회하면서
      for (let i = 0; i < postList.length; i++) {
        // postList[i]의 id, userId와 likeList[i]의 postId, userId가 같다면
        if (!likeList[i]) {
          postList[i].ddabong = "false";
        } else if (
          postList[i].id === likeList[i].postId &&
          postList[i].userId === likeList[i].userId
        ) {
          // likeList[i]의 따봉을 postList[i]의 따봉에 넣어라.
          postList[i].ddabong = likeList[i].ddabong;
          // } else {
          //   postList[i].ddabong = "false";
        }
      }

      console.log("postList 이후", postList);
      return postList;
    });
    console.log(postList);
  });
};

// module.exports = (req, res) => {
//   // postList 저장
//   post.findAll().then((data) => {
//     const postList = data.map((item) => {
//       const post = item.dataValues;
//       const tagArray = tagStringToArray(post.tag);
//       post["tag"] = tagArray;
//       post["ddabong"] = "ok";
//       return post;
//     });

//     console.log("start", postList);

//     // commentList 저장
//     // comment.findAll().then((data) => {
//     //   const commentList = data.map((item) => {
//     //     return item.dataValues;
//     //   });
//     //   console.log("commentList", commentList);
//     //   for (let i = 0; i < postList.length; i++) {
//     //     if (!commentList[i]) {
//     //       postList[i].comment = [];
//     //     } else if (postList[i].comment === "true") {
//     //       postList[i].comment = [];
//     //     } else if (
//     //       postList[i].id === commentList[i].postId &&
//     //       postList[i].userId === commentList[i].userId
//     //     ) {
//     //       postList[i].comment = commentList[i].comment;
//     //     }
//     //   }
//     //   return postList;
//     // });
//     // console.log("변경점", postList);
//     // likeList 저장
//     like.findAll().then((data) => {
//       const likeList = data.map((item) => {
//         return item.dataValues;
//       });
//       console.log("likeList", likeList);
//       for (let i = 0; i < postList.length; i++) {
//         if (!likeList[i]) {
//           postList[i].ddabong = "false";
//         } else if (
//           postList[i].id === likeList[i].postId &&
//           postList[i].userId === likeList[i].userId
//         ) {
//           postList[i].ddabong = likeList[i].ddabong;
//         }
//       }
//       // return postList;
//     });
//     console.log("PL", postList);
//     return res.status(200).send(postList);
//   });
// };
