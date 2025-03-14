import { DocumentNode, print } from "graphql";
import axios from "axios";

import { urls } from "@/config/constants";

export const executor = <T, T2, T3>(
  query: DocumentNode,
  options: {
    transform: (data: T) => T2;
    vars: (data: T3) => void;
  },
) => {
  const res = async (data: T3) => {
    try {
      const result = await axios(urls.api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          query: print(query),
          variables: data,
        },
      });

      const resp = await result.data;

      if (resp.errors) {
        throw new Error(JSON.stringify(resp.errors));
      }

      return options.transform(resp.data);
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        throw err.response.data.errors;
      }

      throw err;
    }
  };

  res.Query = () => query;

  return res;
};
