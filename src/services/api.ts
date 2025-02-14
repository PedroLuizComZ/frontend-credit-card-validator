import axios from "axios";
import { GetServerSidePropsContext, PreviewData } from "next";
import { parseCookies } from "nookies";
import { ParsedUrlQuery } from "querystring";

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const privateApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

if (typeof window !== "undefined") {
  privateApiClient.interceptors.request.use((config) => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });
}

export const createPrivateApiServer = (ctx : GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const privateApiServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  privateApiServer.interceptors.request.use((config) => {
    const cookies = parseCookies(ctx);
    const token = cookies.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return privateApiServer;
};
