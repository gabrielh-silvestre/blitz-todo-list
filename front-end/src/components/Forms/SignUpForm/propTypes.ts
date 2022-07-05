export type FormInput = {
  name: string;
  email: string;
  password: string;
};

export type SignUpFormProps = {
  alreadyHaveAccount: () => void;
  closeForm: () => void;
};
