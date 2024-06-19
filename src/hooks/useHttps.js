import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const responseData = await response.json();

  if (!response.ok) {
    //console.log(response, "Something went wrong");
    throw new Error(responseData || "Something went wrong, Request failed");
  }

  return responseData;
}

export default function Https(url, config) {
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState();
  const [Data, setData] = useState(null);

  function clear_Data() {
    setData(null);
  }

  console.log("Https component");
  const sendRequest = useCallback(
    async (data) => {
      setisLoading(true);

      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        console.log(error);

        seterror(error.message || "Something went wrong");
      }
      setisLoading(false);
    },
    [url, config]
  );

  // first time it will run as sendRequest newly created
  useEffect(() => {
    if (config.method == "GET") {
      sendRequest();
    }
  }, [sendRequest]);

  return {
    error,
    isLoading,
    Data,
    sendRequest,
    clear_Data,
  };
}
