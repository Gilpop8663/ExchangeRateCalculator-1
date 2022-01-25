import { useEffect, useState } from "react";
import { HttpUtil } from "../utils";

export default function useFetch(params) {
  const [requestParams] = useState(params);
  const [isFetching, setIsFetching] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await HttpUtil.requestCurrencyApi(requestParams);
      setIsFetching(false);
      const { msg, data } = res;

      if (!!msg) return;

      setResponse(data.quotes);
    };
    getData();
  }, [requestParams]);

  return { response, isFetching };
}
