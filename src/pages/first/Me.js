import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Util } from "../../utils";
import { useFetch } from "../../hooks";

const Wrapper = styled.div`
  color: black;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  margin: auto;
`;

const SubTitle = styled.h2`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 20px;
`;

const ContentText = styled.h5`
  font-weight: 500;
  font-size: 14px;
  padding-right: 5px;
  color: blue;
`;

const ReceptionCountry = styled.div`
  display: flex;
`;

const SelectCountry = styled.select`
  height: 23px;
  position: relative;
  margin-top: 10px;
  margin-left: 8px;
`;
const InputFormWrapper = styled.form`
  display: flex;
  height: 50px;
  align-items: center;
`;

const InputMoney = styled.input.attrs({ type: "number", min: 0, max: 10000 })`
  max-width: 100px;
  height: 23px;
  margin: 8px;
`;

export default function Me() {
  const [userInput, setUserInput] = useState(0);
  const [money, setMoney] = useState(0);
  const [engCountry, setEngCountry] = useState("KRW");
  const [value, setValue] = useState("한국");
  const [result, setResult] = useState(0);
  const response = async () => {
    await fetch(
      `http://api.currencylayer.com/live?access_key=7c8107b6d3d9494815b4ebb578f5b368&format=1`
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log(value, data);
        if (value === "한국") {
          setEngCountry("KRW");
          setMoney(data.quotes.USDJPY);
        } else if (value === "일본") {
          setEngCountry("JPY");
          setMoney(data.quotes.USDJPY);
        } else if (value === "필리핀") {
          setEngCountry("PHP");
          setMoney(data.quotes.USDPHP);
        }
      });
  };

  const onInputChange = ({ target: { value } }) => {
    setUserInput(value);
  };

  const onChange = ({ target: { value } }) => {
    setValue(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      userInput === "" ||
      userInput > 10000 ||
      userInput < 0 ||
      userInput === NaN
    ) {
      return alert("올바른 값을 입력해주세요.");
    }
    setUserInput(0);
    setResult(Util.getBeautifiedNum((money * userInput).toFixed(2)));
  };

  useEffect(() => {
    response();
  }, [value]);
  return (
    <Wrapper>
      <Title>환율 계산</Title>
      <SubTitle>송금국가: 미국(USD)</SubTitle>
      <ReceptionCountry>
        <SubTitle htmlFor="country">수취국가: </SubTitle>
        <SelectCountry id="country" onChange={onChange}>
          <option value="한국">한국(KRW)</option>
          <option value="일본">일본(JPY)</option>
          <option value="필리핀">필리핀(PHP)</option>
        </SelectCountry>
      </ReceptionCountry>
      <ContentText>{`환율: ${money} ${engCountry}/ USD`}</ContentText>
      <InputFormWrapper onChange={onSubmit}>
        <SubTitle htmlFor="money">송금액: </SubTitle>
        <InputMoney
          type="number"
          id="money"
          value={userInput}
          onChange={onInputChange}
          min={0}
          max={10000}
        />
        <ContentText>USD</ContentText>
        <button type="submit">Submit</button>
      </InputFormWrapper>
      <ContentText>{`수취 금액은 ${result} 입니다.`}</ContentText>
    </Wrapper>
  );
}
