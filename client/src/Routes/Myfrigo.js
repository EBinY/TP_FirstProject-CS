import styled from "styled-components";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyfrigoImg from "../Images/myfrigo.png";
import Loading from "../Components/Loading";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyFrigo = styled.img`
  margin-top: 100px;
  width: 1000px;
  height: 700px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: inherit;
  height: 600px;
  margin-top: 100px;
  width: 300px;
`;

const Circle = styled(motion.div)`
  background-color: ${(props) => props.color};
  margin-bottom: 10px;
  height: 90px;
  width: 90px;
  place-self: center;
  border-radius: 50px;
  border: 2px solid ${(props) => props.theme.bgColor.black};
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Modal = styled(motion.div)`
  width: 300px;
  height: 200px;
  border-radius: 40px;
  background-color: ${(props) => props.theme.bgColor.green};
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  position: absolute;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 10px;
  margin-bottom: 10px;
  text-align: center;
  border: 2px solid black;
  font-size: ${(props) => props.theme.fontSize.small};
`;

const Btn = styled.button`
  margin: 15px 2px 2px 2px;
  padding: 10px 30px;
  font-size: ${(props) => props.theme.fontSize.small};
  border-radius: 15px;
  border: 2px solid black;
  cursor: pointer;
`;

const BtnBox = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 20%;
  top: 850px;
  justify-content: center;
  align-items: center;
`;

const AddBtn = styled(motion.button)`
  width: 190px;
  height: 30px;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.small};
  background-color: ${(props) => props.theme.bgColor.green};
  border-radius: 15px;
  border: 2px solid black;
  margin-bottom: 20px;
  &:hover {
    background-color: ${(props) => props.theme.bgColor.cyan};
  }
`;

const PostBtn = styled(AddBtn)``;

const ExitBtn = styled.button`
  font-size: ${(props) => props.theme.fontSize.small};
  border: 2px solid black;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 30px;
`;

const ModalBtnBox = styled.div`
  display: flex;
`;

function Myfrigo({ isLogin, accessToken }) {
  const navigate = useNavigate();
  const [ingredient, setIngredient] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [color, setColor] = useState("red");
  const [show, setShow] = useState(false);
  console.log(ingredient, expiryDate);

  //마이프리고 접속시 DB에서 데이터 받아오는 코드
  const { isLoading, data } = useQuery(["food"], async () => {
    const response = await fetch("http://localhost:4000/myfrigo", {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      withCredentials: true,
    });
    const data = response.json();
    return data;
  });

  useEffect(() => {
    if (data) {
      // 마이프리고 접속시 유저의 전체 재료
      const date = data.foodRemain;
      if (date > 0) {
        return setColor("green");
      } else if (-4 <= date < 0) {
        return setColor("yellow");
      } else {
        return setColor("red");
      }
    }
  }, [data]);

  const QuickPost = () => {
    setShow(false);
    navigate(
      `/post/${["당근", "양배추", "김치", "족발", "사골국물", "콜라"].join()}`,
    );
  };

  const onChangeIngredient = (e) => {
    setIngredient(e.target.value);
  };

  const onChangeExpriyDate = (e) => {
    setExpiryDate(e.target.value);
  };

  //지금 수정/삭제하려는 재료id를 어떻게 알고 지정하지?
  //첫번째,
  //어짜피 유저는 구분할 수 있으니
  //Add(post), Edit(patch), Delete(delete)를 https://localhost:4000/food로 통일하고
  //재료 값을 입력해서 재료명/유통기한을 입력해서 주면
  //서버에서 DB에서 비교해서 같은거 지우기
  //두번째,
  //ㄹㅇ 생각 안남
  //원래는 드래그만 아니면 리스트에 키를 아이디를 부여해서
  //그걸로 id를 찾아내면되는데 지금은 해당 안됨.

  const handleEdit = () => {
    console.log("EDIT");
    axios
      .patch(
        `http://localhost:4000/food/${data.id}`,
        { foodName: ingredient, foodDate: expiryDate },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          withCredentials: true,
        },
      )
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  const handleDelete = () => {
    console.log("DELETE");
    axios
      .delete(`http://localhost:4000/food/${data.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        withCredentials: true,
      })
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const handleAdd = () => {
    console.log("ADD");
    axios
      .post(
        "http://localhost:4000/food",
        { foodName: ingredient, foodDate: expiryDate },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          withCredentials: true,
        },
      )
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const coldFood = Array.from({ length: 10 });

  return (
    <>
      {false ? (
        <Loading />
      ) : (
        <Box>
          <Wrapper>
            {coldFood.map((food, index) => (
              <Circle
                color={color}
                key={index}
                drag
                dragElastic={1}
                dragMomentum={false}
                dragConstraints={{ right: 600 }}
              >
                {color}
              </Circle>
            ))}
          </Wrapper>

          <MyFrigo src={MyfrigoImg} />
          <Wrapper>
            {coldFood.map((food, index) => (
              <Circle
                color={color}
                key={index}
                drag
                dragElastic={1}
                dragMomentum={false}
                dragConstraints={{ right: 600 }}
              >
                {color}
              </Circle>
            ))}
          </Wrapper>
          {show ? (
            <Modal>
              <ExitBtn onClick={() => setShow(false)}>X</ExitBtn>
              <Input
                onChange={onChangeIngredient}
                required={true}
                placeholder="식품명을 입력하세요."
              ></Input>
              <Input
                onChange={onChangeExpriyDate}
                type="date"
                required={true}
              ></Input>
              <ModalBtnBox>
                <Btn onClick={handleAdd}>Add</Btn>
                <Btn onClick={handleEdit}>Edit</Btn>
                <Btn onClick={handleDelete}>Delete</Btn>
              </ModalBtnBox>
            </Modal>
          ) : null}
          {isLogin ? (
            <BtnBox>
              <AddBtn onClick={() => setShow(true)}>재료</AddBtn>
              <PostBtn onClick={QuickPost}>내 냉장고를 부탁해</PostBtn>
            </BtnBox>
          ) : null}
        </Box>
      )}
    </>
  );
}

export default Myfrigo;
