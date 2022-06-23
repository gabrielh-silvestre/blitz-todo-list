type SuccessCase<T> = {
  statusCode: number;
  payload: T;
};

type ErrorCase = SuccessCase<{ message: string }>;

export { SuccessCase, ErrorCase };
