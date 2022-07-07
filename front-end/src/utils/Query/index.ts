import type { AxiosError } from "axios";
import toast from "react-hot-toast";

import type { ApiErrorResponse } from "../../types";

export const onQueryError = (err: AxiosError<ApiErrorResponse>) => {
  err.response
    ? toast.error(err.response.data.message)
    : toast.error("Something went wrong");
};

export const onQuerySuccess = (message: string) => {
  toast.success(message);
};
