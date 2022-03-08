import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import QuickPost from "./QuickPost";
import { getPost } from "../api";
import Loading from "../Components/Loading";
import PostListItem from "../Components/PostListItem";

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
  //cursor: grab;
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
  //margin-top: 20px;
  width: 16.5%;
  height: 2.4rem;
  margin-right: 40px;
  border: 2px solid;
  border-radius: 5px;
  cursor: pointer;
`;

const PostInsertButton = styled.button`
  background-color: ${(props) => props.theme.bgColor.skyblue};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSize.small};
  //margin-top: 20px;
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

const sampleBtn = styled.button`
  width: 50px;
  height: 20px;
`;

function Post({ isLogin }) {
  const [data, setData] = useState({
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
  });
  const { newTag } = useParams();
  //const [keyword, setKeyword] = useState("가자");
  //const [isLoading, setIsLoading] = useState(false);
  // const {
  //   register,
  //   watch,
  //   handleSubmit,
  //   formState: { errors },
  //   setError,
  // } = useForm();
  //useEffect((),[])
  // data는 getPost의 결과값, isLoading은
  // post창 접속시 db의 포스트를 get요청으로 받아옴
  //const { isLoading, data } = useQuery(["post"], getPost);
  //console.log(data);
  const posts = data?.row ? Object.values(data.row).reverse() : undefined;

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
              <PostInsertButton>Post</PostInsertButton>
            </PostFunctionContainer>
          ) : null}
          {posts ? (
            <PostList>
              {posts.map((item, i) => (
                <PostListItem
                  isLogin={isLogin}
                  key={i}
                  //item={item}
                  id={item.id}
                  userId={item.userId}
                  title={item.title}
                  tag={item.tag}
                  newTag={newTag}
                  name={item.username}
                  create={item.createdAt}
                  content={item.content}
                  comment={item.comment}
                ></PostListItem>
              ))}
            </PostList>
          ) : (
            <EmptyPostHolder>포스트가 아직 없어요</EmptyPostHolder>
          )}
        </Wrapper>
      )}
      <PostBox>
        <QuickPost />
      </PostBox>
    </>
  );
}

export default Post;
