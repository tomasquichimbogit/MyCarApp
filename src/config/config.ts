import axios, { type AxiosResponse } from "axios";
import { SUPABASE_URL } from "../constants";


const simpleAxiosInstance = axios.create({
  baseURL: `${SUPABASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
}); 


const request = <TResponse>(requestFn: () => Promise<AxiosResponse<TResponse>>) => {
  return requestFn().then((response) => response.data);
};

export const post = <TData, TResponse>(url: string, data?: TData) => {
  return request<TResponse>(() => simpleAxiosInstance.post(url, data));
};
