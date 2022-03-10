import axios from "axios";

export async function getRecipe(keyword) {
  const response = await fetch(
    `https://openapi.foodsafetykorea.go.kr/api/607eeb411bbe475e9319/COOKRCP01/json/1/10/RCP_PARTS_DTLS=${keyword}`,
  );
  const data = response.json();
  return data;
}

export async function getPost(accessToken) {
  const data = await axios.get(`http://localhost:4000/post`, {
    headers: { "Content-Type": "application/json", Authorization: accessToken },
    withCredentials: true,
  });
  return data;
}

// export async function getPost() {
//   // res.data = {id(key로 사용),username,title,[...tag],content,createdAt,[...comment(id(key로 사용),username,content,createdAt)]}
//   const mock = {
//     data: [
//       {
//         id: "1",
//         userId: "1",
//         username: "진",
//         title: "아직 한개 남았다",
//         tag: ["양배추"],
//         content: "양배추로 뭐 해먹을 수 있어?",
//         ddCnt: "14",
//         ddabong: "true", //0: 노, 1:굿, 비회원: (0 또는 생략)
//         createdAt: "2022-03-04-09:31",
//         comment: [
//           {
//             id: "1",
//             userId: "4",
//             postId: "1",
//             username: "제드",
//             content: "걍 버려라 양배추 왜먹음??????",
//             createdAt: "220308",
//           },
//         ],
//       },
//       {
//         id: "2",
//         userId: "2",
//         username: "이즈리얼",
//         title: "많고 많은~",
//         tag: ["식빵", "계란"],
//         content: "레시피 중에 신박한거 없냐?",
//         ddCnt: "2",
//         ddabong: "true",
//         createdAt: "2022-03-05-12:29",
//         comment: [
//           {
//             id: "1",
//             userId: "5",
//             postId: "2",
//             username: "가렌",
//             content: "걍 토스트 해먹으셈;;",
//             createdAt: "220308",
//           },
//           {
//             id: "2",
//             userId: "6",
//             postId: "3",
//             username: "럭스",
//             content: "식빵에 계란옷 입혀서 구워먹으면 진짜 맛있어요!",
//             createdAt: "220308",
//           },
//         ],
//       },
//       {
//         id: "3",
//         userId: "3",
//         username: "에코",
//         title: "요리 잘하는 사람?",
//         tag: ["만두", "족발", "양파"],
//         content: "오늘안에 먹어야하는데 요리 잘하는 사람 훈수 좀ㅋ",
//         ddCnt: "10",
//         ddabong: "false",
//         createdAt: "2022-03-06-13:49",
//         comment: [],
//       },
//       {
//         id: "4",
//         userId: "4",
//         username: "빅토르",
//         title: "요리 추천 좀",
//         tag: ["양파", "당근", "계란"],
//         content: "저 재료로 참신한 거 없냐?",
//         ddCnt: "3",
//         ddabong: "true",
//         createdAt: "2022-03-07-12:39",
//         comment: [
//           {
//             id: "1",
//             userId: "5",
//             postId: "2",
//             username: "나미",
//             content:
//               "캔참치 사와서 야채썰고 계란 풀고 참치 넣고 전부치면 맛있어요~",
//             createdAt: "220308",
//           },
//           {
//             id: "2",
//             userId: "6",
//             postId: "3",
//             username: "다리우스",
//             content: "계란국 끓여도 될듯??",
//             createdAt: "220308",
//           },
//         ],
//       },
//       {
//         id: "5",
//         userId: "5",
//         username: "블리츠",
//         title: "내 냉장고를 부탁해!",
//         tag: ["사골국물", "떡", "계란"],
//         content:
//           "냉장고에 있는 재료 오늘까지 먹어야하는데 떡국말고 누가 다른 레시피 추천해줄 사람??",
//         ddCnt: "123",
//         ddabong: "false",
//         createdAt: "2022-03-07-12:57",
//         comment: [
//           {
//             id: "1",
//             userId: "5",
//             postId: "5",
//             username: "빅토르",
//             content: "만두 사와서 만둣국해먹으셈 ㄹㅇ꿀맛",
//             createdAt: "220308",
//           },
//           {
//             id: "2",
//             userId: "6",
//             postId: "5",
//             username: "카타리나",
//             content:
//               "나였으면 햄사와서 부대찌개만들어서 밥에다 계란후라이 각이다",
//             createdAt: "220308",
//           },
//         ],
//       },
//     ],
//   };
//   return mock;
// }
