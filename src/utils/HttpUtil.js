import axios from "axios";

class HttpUtil {
  API_KEY = [
    process.env.REACT_APP_CURRENCY_KEY,
    process.env.REACT_APP_CURRENCY_KEY2,
    process.env.REACT_APP_CURRENCY_KEY3,
  ];
  CURRENCY_URL = "http://api.currencylayer.com/";

  requestCurrencyApi = async (args) => {
    const getApi = (url, params) => {
      let body = {
        url: this.CURRENCY_URL + url,
        method: "GET",
      };

      let data = {
        params: {
          access_key: this.API_KEY[0],
          ...params,
        },
      };

      return axios({ ...body, ...data })
        .then((res) => res)
        .catch((err) => err.response);
    };

    const response = await getApi(args.url, args.params);

    let msg = "";

    if (response.status !== 200) {
      msg = "네트워크 통신 중 오류 발생. 오류 코드 :" + response.error.code;
    }
    if (!response.data.success) {
      msg = `${response.data.error.code} : ${response.data.error.info}`;
    }

    return { data: response.data, msg };
  };
}

export default new HttpUtil();
