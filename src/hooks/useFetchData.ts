import { useEffect, useState } from "react";
import mainApi from "../services/apis/mainApi";

// 홈 화면 fetch 받기
export default function useFetchData(url: string) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    const response = await mainApi.get(url);

    setData(response.data.body.send_data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading };
}
