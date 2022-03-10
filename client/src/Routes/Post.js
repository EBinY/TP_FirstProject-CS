import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams, useMatch } from "react-router-dom";
import QuickPost from "../Components/QuickPost";
import EditPost from "../Components/EditPost";
import Loading from "../Components/Loading";
import PostListItem from "../Components/PostListItem";
import axios from "axios";
import { useQuery } from "react-query";
import { getPost } from "../api";

const Wrapper = styled.div`
  width: 92%;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const PostBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
`;

const PostList = styled.ul``;

const PostFunctionContainer = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 30px;
`;

const PostSearchInput = styled.input`
  opacity: 0;
  display: inline-block;
  font-size: ${(props) => props.theme.fontSize.small};
  text-align: left;
  justify-content: center;
  width: 67%;
  height: 2rem;
  padding-left: 10px;
  border: 2px solid;
  border-radius: 3px;
`;

const PostSearchButton = styled.button`
  opacity: 0;
  background-color: ${(props) => props.theme.bgColor.skyblue};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize.small};
  width: 16.5%;
  height: 2.4rem;
  margin-right: 40px;
  border: 2px solid;
  border-radius: 5px;
  cursor: pointer;
`;

const PostPopupButton = styled.button`
  background-color: ${(props) => props.theme.bgColor.skyblue};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize.small};
  width: 16.5%;
  height: 2.4rem;
  margin-right: 40px;
  border: 2px solid;
  border-radius: 5px;
  cursor: pointer;
`;

const EmptyPostHolder = styled.span`
  padding-top: 50px;
  font-size: ${(props) => props.theme.fontSize.medium};
`;

const PostModalBox = styled.div`
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  width: 400px;
  height: 600px;
  display: flex;
  border: 2px solid black;
  border-radius: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 300px;
  background-color: ${(props) => props.theme.bgColor.cyan};
`;

const PostModalInput = styled.input`
  width: 300px;
  padding: 5px 20px;
  margin-bottom: 10px;
  border: 2px solid black;
  border-radius: 15px;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const PostModalContent = styled.textarea`
  padding: 20px;
  width: 300px;
  height: 200px;
  border: 2px solid black;
  border-radius: 15px;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const PostModalNametag = styled.div`
  font-size: ${(props) => props.theme.fontSize.medium};
`;

const PostModalButton = styled.button`
  margin-top: 10px;
  padding: 10px 30px;
  font-size: ${(props) => props.theme.fontSize.small};
  border-radius: 15px;
  border: 2px solid black;
  cursor: pointer;
`;

const PostModalCloseButton = styled.button`
  font-size: ${(props) => props.theme.fontSize.small};
  border: 2px solid black;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
`;

function Post({ isLogin, accessToken }) {
  const { newTag } = useParams();
  const postMatch = useMatch("/post");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState({});

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:4000/post`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: accessToken,
  //       },
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       const data = res.data;
  //       console.log("res", res);
  //       setPost(data);
  //       console.log("포스트", post);
  //       return data;
  //     });
  // }, []);

  useEffect(() => {
    const sendAPICall = async () => {
      const data = await getPost(accessToken);
      setPost(data);
    };
    sendAPICall();
  }, []);
  console.log("n", post);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/post", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: accessToken,
  //       },
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       const data = res.data;
  //       // console.log("얘는 잘 나옴", realFoodList);
  //       setPost(data);
  //       // console.log("포스트", post);
  //     });
  // }, []);

  // const { isLoading, data } = useQuery(["postList"], function (accessToken) {
  //   const data = axios.get(`http://localhost:4000/post`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: accessToken,
  //     },
  //     withCredentials: true,
  //   });
  //   return data;
  // });

  //console.log("data", data);
  const mock = {
    data: [
      {
        id: "1",
        userId: "1",
        username: "진",
        title: "아직 한개 남았다",
        tag: ["양배추"],
        content: "양배추로 뭐 해먹을 수 있어?",
        ddCnt: "14",
        ddabong: "true", //0: 노, 1:굿, 비회원: (0 또는 생략)
        createdAt: "2022-03-04-09:31",
        comment: [
          {
            id: "1",
            userId: "4",
            postId: "1",
            username: "제드",
            content: "걍 버려라 양배추 왜먹음??????",
            createdAt: "220308",
          },
        ],
      },
    ],
  };
  // 빈배열도 빈값으로 인식시켜야 해서 삼항을 추가함
  const posts = post?.data
    ? post?.data.length !== 0
      ? Object.values(post.data).reverse()
      : undefined
    : undefined;
  console.log("s", posts);

  const handleAddPostModal = () => {
    setShow(!show);
  };

  const handleAddPost = () => {
    // console.log(title, tag, content);
    let tagArray = tag.split(",");
    // console.log(tagArray);

    setShow(!show);
    // console.log("엑세스토큰", accessToken);
    axios
      .post(
        `http://localhost:4000/post`,
        {
          title,
          tag: tagArray,
          content,
          // comment: [],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          withCredentials: true,
        },
      )
      .then((res) => {});
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCloseModal = () => {
    setShow(!show);
  };

  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <Wrapper>
          {isLogin ? (
            <PostFunctionContainer>
              <PostSearchInput />
              <PostSearchButton></PostSearchButton>
              <PostPopupButton onClick={handleAddPostModal}>
                Post
              </PostPopupButton>
            </PostFunctionContainer>
          ) : null}
          {posts ? (
            <PostList>
              {posts.map((item, i) => (
                <PostListItem
                  isLogin={isLogin}
                  accessToken={accessToken}
                  key={i}
                  //item={item}
                  id={item.id}
                  userId={item.userId}
                  title={item.title}
                  tag={item.tag}
                  newTag={newTag}
                  name={item.username}
                  create={item.createdAt}
                  postContent={item.content}
                  comment={item.comment}
                  ddCnt={item.ddCnt}
                  ddabong={item.ddabong}
                ></PostListItem>
              ))}
            </PostList>
          ) : (
            <EmptyPostHolder>포스트가 아직 없어요</EmptyPostHolder>
          )}
        </Wrapper>
      )}
      {show ? (
        <PostModalBox>
          <PostModalCloseButton onClick={handleCloseModal}>
            X
          </PostModalCloseButton>
          <PostModalNametag>Title</PostModalNametag>
          <PostModalInput
            onChange={handleTitleChange}
            placeholder="제목은 여기에"
          />
          <PostModalNametag>Tags</PostModalNametag>
          <PostModalInput
            onChange={handleTagChange}
            placeholder="태그는 여기에"
          />
          <PostModalNametag>Content</PostModalNametag>
          <PostModalContent
            onChange={handleContentChange}
            placeholder="내용은 여기에"
          />
          <PostModalButton onClick={handleAddPost}>Post</PostModalButton>
        </PostModalBox>
      ) : null}
      {postMatch ? null : (
        <PostBox>
          <QuickPost />
        </PostBox>
      )}
    </>
  );
}

export default Post;
