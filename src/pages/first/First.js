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

const InputMoney = styled.input.attrs({ type: "number" })`
  max-width: 100px;
  height: 23px;
  margin: 8px;
`;

export default function First() {
  const defParams = { url: "live", params: null };

  const [exchange, setExchange] = useState(0);
  const [country, setCountry] = useState("");
  const [engCountry, setEngCountry] = useState("KRW");
  const [money, setMoney] = useState(0);
  const [result, setResult] = useState(0);
  const { response } = useFetch(defParams);

  const moneySubmit = (e) => {
    e.preventDefault();
    if (money === "" || money <= 0 || money > 10000 || !isFinite(money)) {
      alert("송금액이 바르지 않습니다");
    } else {
      setResult(Util.getBeautifiedNum((exchange * money).toFixed(2)));
    }
  };

  const selectExchange = () => {
    switch (country) {
      case "일본":
        setExchange(response.USDJPY);
        setEngCountry("JPY");
        break;
      case "필리핀":
        setExchange(response.USDPHP);
        setEngCountry("PHP");
        break;
      default:
        setExchange(response.USDKRW);
        setEngCountry("KRW");
        break;
    }
  };

  useEffect(() => {
    if (!response) return;

    switch (country) {
      case "일본":
        setExchange(response.USDJPY);
        setEngCountry("JPY");
        break;
      case "필리핀":
        setExchange(response.USDPHP);
        setEngCountry("PHP");
        break;
      default:
        setExchange(response.USDKRW);
        setEngCountry("KRW");
        break;
    }
  }, [country, response]);

  const onChange = (e, type) => {
    switch (type) {
      case "select":
        setCountry(e.target.value);
        selectExchange();
        break;
      case "money":
        setMoney(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <Title>환율 계산</Title>
      <SubTitle>송금국가: 미국(USD)</SubTitle>
      <ReceptionCountry>
        <SubTitle htmlFor="country">수취국가: </SubTitle>
        <SelectCountry id="country" onChange={(e) => onChange(e, "select")}>
          <option value="한국">한국(KRW)</option>
          <option value="일본">일본(JPY)</option>
          <option value="필리핀">필리핀(PHP)</option>
        </SelectCountry>
      </ReceptionCountry>
      <ContentText>{`환율: ${Util.getBeautifiedNum(
        exchange.toFixed(2)
      )} ${engCountry} / USD`}</ContentText>
      <InputFormWrapper>
        <SubTitle htmlFor="money">송금액: </SubTitle>
        <InputMoney
          type="number"
          id="money"
          onChange={(e) => onChange(e, "money")}
        />
        <ContentText>USD</ContentText>
        <button type="submit" onClick={moneySubmit}>
          Submit
        </button>
      </InputFormWrapper>
      {result <= 0 ? null : (
        <ContentText>{`수취 금액은 ${result} ${engCountry} 입니다.`}</ContentText>
      )}
    </Wrapper>
  );
}
