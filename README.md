# 배포 주소
<a href="https://github.com/ysh0514">환율 계산기 사이트</a>

## 프로젝트 구조 설명

src  
 ┣ hooks  
 ┃ ┣ index.js  
 ┃ ┗ useFetch.js  
 ┣ pages  
 ┃ ┣ first  
 ┃ ┃ ┣ First.js  
 ┃ ┃ ┗ fucntion.js  
 ┃ ┗ second  
 ┃ ┃ ┗ Second.js  
 ┣ styles  
 ┃ ┗ GlobalStyle.js  
 ┣ tests  
 ┃ ┣ first.test.js  
 ┃ ┗ second.test.js  
 ┣ utils  
 ┃ ┣ HttpUtil.js  
 ┃ ┣ Util.js  
 ┃ ┗ index.js  
 ┣ Router.js  
 ┗ index.js  

# 과제 구현 목록


## 첫번째 계산기
만든 조원 : <a href="https://github.com/Gilpop8663">김영길</a>, <a href="https://github.com/leenawon">이나원</a>, <a href="https://github.com/limbs722">임보슬</a>
* 기능
	- 환율 API 요청
		-> axios 로 API 요청
		-> custom hook 'useFetch' 사용
	- SelectBox 선택/변경할 때마다 환율 API 요청 후 환율 반영
	- 숫자 포맷 기능
	- 'Submit' 버튼 구현
		-> 클릭 시 입력한 값 반영
		-> 예외처리 반영
		-> 0 이하로 입력할 시 alert로 에러 메시지 팝업
		-> 수취금액이 0 이하일 경우 메시지 렌더링하지 않음
  -> 숫자 포맷 기능(3자리수 넘어갈 경우 ',' 표기)
<div align="center"}>
<img width="70%" src="https://user-images.githubusercontent.com/80146176/151013945-37b3300e-2a0a-4fff-8c0f-dce85916a389.gif"/>
<img width="70%" src="https://user-images.githubusercontent.com/80146176/151014043-f89c50af-8836-4ca3-ab85-d0b096457181.gif"/>
</div>
출처: https://ndb796.tistory.com/557 [안경잡이개발자]



## 두번째 계산기
만든 조원 : <a href="https://github.com/ysh0514">양성호</a>, <a href="https://github.com/ysh0514">유대형</a>
* 기능
 - input 창에 숫자만 입력 가능. 1000이상의 숫자 입력시 자동으로 “1,000” 와 같이 천단위로 소숫점 표시.
 - 상단 드롭다운 탭 클릭 시 display : none 속성을 state 값으로 제어하여 Dropdown 구현. USD,CAD,KRW, HKD,JPY,CNY 선택 가능.
 - 상단 드롭다운에서 선택한 환율은 하단 탭에서 제거되고 그 자리에 기존의 환율이 배치되도록 구현.
 - 사용자의 수치 입력 혹은 상단 드롭다운 메뉴를 이용하여 통화 변경시 변경될 환율과 기준일 정보가 동기화 되도록 구현.
 
 <div align="center"}>
<img width="70%" src="https://user-images.githubusercontent.com/80146176/151014532-9a1d8f7c-55f1-43cd-9e6d-5a14da9cdf1b.gif"/>
<img width="70%" src="https://user-images.githubusercontent.com/80146176/151014542-3a12f259-059e-4ca1-83b4-ac207ff029e9.gif"/>
</div>



 # Unit Test (jest)
 
+ 첫번째 페이지 테스트 값

```javascript
import { moneySubmit } from '../pages/first/fucntion';

it('1000을 입력하였을 경우', () => {
  expect(moneySubmit(1000)).toBe('1,000,000.00');
});

it('10,000보다 큰 숫자가 입력되었을 경우', () => {
  expect(moneySubmit(10001)).toEqual(null);
});

it('0보다 작은 숫자가 입력되었을 경우', () => {
  expect(moneySubmit(-1)).toEqual(null);
});

it('문자열이 입력되었을 경우', () => {
  expect(moneySubmit('문자')).toEqual(null);
});

it('1579을 입력하였을 경우', () => {
  expect(moneySubmit(1579)).toEqual('1,579,000.00');
});
```

+ 두번째 페이지 테스트 값

```javascript
import { checkDecimal } from '../pages/first/fucntion';

it('1000을 입력하였을 경우', () => {
  expect(checkDecimal('1000')).toBe('1000.00');
});

it('소수점이 2자리 있는 경우', () => {
  expect(checkDecimal('301.01')).toEqual('301.01');
});

it('소수점이 1자리 있는 경우', () => {
  expect(checkDecimal('427.1')).toEqual('427.10');
});

it('0이 입력되었을 경우', () => {
  expect(checkDecimal('0')).toEqual('0.00');
});

it('숫자가 아닐 경우', () => {
  expect(checkDecimal('한글')).toEqual('한글.00');
});
```


### 유닛 테스트 결과
![image](https://user-images.githubusercontent.com/80146176/151011873-39589da6-a79c-4dbc-a407-a21a76a9cc0b.png)







 
 ## 영상 (gif)넣을것
