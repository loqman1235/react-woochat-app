import { useEffect, useState } from "react";
import api from "@/services/api";

/**
 * Custom hook to fetch data from the API.
 */

const useFetch = <T>(
  url: string,
  id?: string,
): { data: T | null; isLoading: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (id) {
          response = await api.get<T>(`${url}/${id}`);
        } else {
          response = await api.get<T>(url);
        }

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, id]);

  return {
    data,
    isLoading,
  };
};

export default useFetch;
