import { AxiosInstance } from "axios";

export type FetchMethods = keyof Pick<
  AxiosInstance,
  "get" | "post" | "put" | "patch" | "delete"
>;
