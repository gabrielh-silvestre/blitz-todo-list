export type ApiSuccessResponse<T> = {
  status: number;
  data: T;
};

export type ApiErrorResponse = {
  message: string;
};

export type Token = {
  token: string;
};
