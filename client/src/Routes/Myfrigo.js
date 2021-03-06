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

  //??????????????? ????????? DB?????? ????????? ???????????? ??????
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
      // ??????????????? ????????? ????????? ?????? ??????
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
      `/post/${["??????", "?????????", "??????", "??????", "????????????", "??????"].join()}`,
    );
  };

  const onChangeIngredient = (e) => {
    setIngredient(e.target.value);
  };

  const onChangeExpriyDate = (e) => {
    setExpiryDate(e.target.value);
  };

  //?????? ??????/??????????????? ??????id??? ????????? ?????? ?????????????
  //?????????,
  //????????? ????????? ????????? ??? ?????????
  //Add(post), Edit(patch), Delete(delete)??? https://localhost:4000/food??? ????????????
  //?????? ?????? ???????????? ?????????/??????????????? ???????????? ??????
  //???????????? DB?????? ???????????? ????????? ?????????
  //?????????,
  //?????? ?????? ??????
  //????????? ???????????? ????????? ???????????? ?????? ???????????? ????????????
  //????????? id??? ????????????????????? ????????? ?????? ??????.

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
                placeholder="???????????? ???????????????."
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
              <AddBtn onClick={() => setShow(true)}>??????</AddBtn>
              <PostBtn onClick={QuickPost}>??? ???????????? ?????????</PostBtn>
            </BtnBox>
          ) : null}
        </Box>
      )}
    </>
  );
}

export default Myfrigo;
