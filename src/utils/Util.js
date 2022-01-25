class Util {
  // 숫자 3자리 이상 될 때 ',' 표시
  getBeautifiedNum = (value) =>
    value < 1000
      ? value
      : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default new Util();
