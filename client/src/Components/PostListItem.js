import styled from "styled-components";

const PostItem = styled.li`
  list-style: none;
  width: 550px;
  align-items: center;
  text-align: center;
  padding: 10px;
  border: 3px solid black;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.bgColor.green};
`;

const PostButtonBox = styled.div`
  //align-items: right;
  text-align: right;
`;

const PostEditButton = styled.button`
  background-color: ${(props) => props.theme.bgColor.skyblue};
  font-size: ${(props) => props.theme.fontSize.small};
  width: 50px;
  height: 30px;
  margin-right: 5px;
`;
const PostDeleteButton = styled.button`
  background-color: ${(props) => props.theme.bgColor.skyblue};
  font-size: ${(props) => props.theme.fontSize.small};
  width: 50px;
  height: 30px;
`;
const PostTitle = styled.h1`
  font-size: 30px;
  padding-top: 20px;
  width: 400px;
  //display: absolute;
  display: block;
  text-align: center;
`;
const PostWriter = styled.h1`
  font-size: 30px;
  padding-top: 20px;
  width: 400px;
  //display: absolute;
  display: block;
  text-align: center;
`;
const PostBDay = styled.h1`
  font-size: 30px;
  padding-top: 20px;
  width: 400px;
  //display: absolute;
  display: block;
  text-align: center;
`;
const PostTag = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  padding-top: 20px;
  width: 400px;
  //align-items: center;
  display: inline-block;
  text-align: left;
`;
const PostContent = styled.div`
  font-size: ${(props) => props.theme.fontSize.small};
  padding-top: 20px;
  width: 400px;
  //align-items: center;
  display: inline-block;
  text-align: left;
`;
const PostCommentContainer = styled.div``;
const PostCommentInput = styled.input``;
const PostCommentButton = styled.button``;
const PostCommentList = styled.ul`
  list-style: none;
  width: 522px;
  align-items: center;
  text-align: center;
  padding: 10px;
  border: 3px solid orange;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.bgColor.green};
`;
const PostCommentEmptyHolder = styled.span`
  padding-top: 50px;
  font-size: ${(props) => props.theme.fontSize.medium};
`;
const PostCommentBox = styled.li``;
const PostCommentWriter = styled.div``;
const PostCommentBDay = styled.div``;
const PostCommentContent = styled.div``;
const PostCommentDelButton = styled.button``;

// isLogin, title, username, createdAt, tag, content, comment
function PostListItem({
  isLogin,
  id,
  userId,
  title,
  name,
  create,
  tag,
  newTag,
  content,
  comment,
}) {
  const comList = comment.reverse();
  const tagList = newTag ? newTag : tag;
  //console.log(isLogin);
  console.log(comList);
  //console.log(tag);
  //console.log(newTag);
  return (
    <PostItem>
      <>
        {isLogin ? (
          <PostButtonBox>
            <PostEditButton>Edit</PostEditButton>
            <PostDeleteButton>Del</PostDeleteButton>
          </PostButtonBox>
        ) : null}
      </>
      <PostTitle>{title}</PostTitle>
      <PostWriter>{name}</PostWriter>
      <PostBDay>{create}</PostBDay>
      {tag.length !== 0 ? <PostTag>{tag}</PostTag> : null}
      <PostContent>{content}</PostContent>
      {isLogin ? (
        <PostCommentContainer>
          <PostCommentInput placeholder="댓글은 여기에 입력하세요" />
          <PostCommentButton>댓글추가</PostCommentButton>
        </PostCommentContainer>
      ) : null}
      {comList.length !== 0 ? (
        <PostCommentList>
          {comList.map((el) => (
            <PostCommentBox>
              <PostCommentWriter>{el.username}</PostCommentWriter>
              <PostCommentBDay>{el.createdAt}</PostCommentBDay>
              <PostCommentContent>{el.content}</PostCommentContent>
              {isLogin ? (
                <PostCommentDelButton>삭제</PostCommentDelButton>
              ) : null}
            </PostCommentBox>
          ))}
        </PostCommentList>
      ) : null}
    </PostItem>
  );
}

export default PostListItem;
// commentitem(map)
// {comList.map((item, i) => {
//   <CommentListItem key={i} isLogin={isLogin} list={item} />;
// })}

// onboard commentlist rendering(map)
// 전달받은 comment째로 해도 안되고, 변수화해서 해도 안되고
// 컴포넌트를 만들어서 불러와보자
{
  /* {comList.length !== 0 ? ( */
}
{
  /* {comList.map((com, i) => {
        {com ? (
          <PostCommentList key={i}>
          <PostCommentWriter>{com.username}</PostCommentWriter>
          <PostCommentBDay>{com.createdAt}</PostCommentBDay>
          <PostCommentContent>{com.content}</PostCommentContent>
          <PostCommentDelButton />
        </PostCommentList>
        ) :null}
      })} */
}
{
  /* ) :null} */
}
