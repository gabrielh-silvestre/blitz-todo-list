export type FormInput = {
  email: string;
  password: string;
};

export type SignInFormProps = {
  alreadyHaveAccount: () => void;
  closeForm: () => void;
};
