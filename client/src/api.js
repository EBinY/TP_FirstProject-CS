const BASE_URL = "http://localhost:4000";

// export async function getPost() {
//   const response = await fetch(`${BASE_URL}/post`);
//   const data = response.json();
//   return data;
// }

export async function getRecipe(keyword) {
  const response = await fetch(
    `https://openapi.foodsafetykorea.go.kr/api/607eeb411bbe475e9319/COOKRCP01/json/1/10/RCP_PARTS_DTLS=${keyword}`,
  );
  const data = response.json();
  const list = data.row;
  return data;
}

export async function getPost() {
  // res.data = {id(key로 사용),username,title,[...tag],content,createdAt,[...comment(id(key로 사용),username,content,createdAt)]}
  const mock = {
    row: [
      {
        id: "1",
        userId: "1",
        username: "eb",
        title: "hey",
        tag: ["atag", "btag", "ctag"],
        content: "how are you",
        createdAt: "220307",
        comment: [
          {
            id: "1",
            userId: "4",
            postId: "1",
            username: "fdk",
            content: "wow",
            createdAt: "220308",
          },
        ],
      },
      {
        id: "2",
        userId: "2",
        username: "kb",
        title: "heyyo",
        tag: ["dtag", "ctag"],
        content: "i'm fine",
        createdAt: "220307",
        comment: [
          {
            id: "1",
            userId: "5",
            postId: "2",
            username: "jdz",
            content: "moly",
            createdAt: "220308",
          },
          {
            id: "2",
            userId: "6",
            postId: "3",
            username: "kjd",
            content: "holymoly",
            createdAt: "220308",
          },
        ],
      },
      {
        id: "3",
        userId: "3",
        username: "jkb",
        title: "whatsup",
        tag: [],
        content: "so holy",
        createdAt: "220308",
        comment: [],
      },
    ],
  };
  return mock;
}
