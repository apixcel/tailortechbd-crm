"use client";

import { useEffect, useState } from "react";

export interface ICountry {
  name: string;
  dial_code: string;
  code: string;
}
const useCountries = () => {
  const [data, setData] = useState<{ isLoading: boolean; data: ICountry[] }>({
    isLoading: true,
    data: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      setData({ isLoading: true, data: [] });
      const res = await fetch("/country_codes.json");
      const data = await res.json();
      setData({ isLoading: false, data });
    };
    fetchData();
    return () => {
      setData({ isLoading: true, data: [] });
    };
  }, []);
  return data;
};

export default useCountries;
