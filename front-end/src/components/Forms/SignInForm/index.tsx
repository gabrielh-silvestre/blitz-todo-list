import { useForm, SubmitHandler } from "react-hook-form";

import type { FormInput, SignInFormProps } from "./propTypes";

import { useUsers } from "../../../hooks/useUsers";

import {
  FormContainer,
  FieldContainer,
  Label,
  SubmitButton,
  TextInput,
  FieldLegend,
  InputWarning,
  ChangeForm,
} from "./styles";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignInForm({ alreadyHaveAccount, closeForm }: SignInFormProps) {
  const { signIn } = useUsers();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInput>({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormInput> = (data, e) => {
    e?.preventDefault();

    signIn(data);
    closeForm();
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FieldContainer>
        <FieldLegend>Sign In</FieldLegend>

        <div>
          <Label htmlFor="email">
            Email:
            <TextInput
              type="email"
              id="email"
              {...register("email", {
                required: { value: true, message: "Email is required!" },
                pattern: { value: EMAIL_REGEX, message: "Email is invalid!" },
              })}
            />
            {errors.email && (
              <InputWarning>{errors.email.message}</InputWarning>
            )}
          </Label>

          <Label htmlFor="password">
            Password:
            <TextInput
              type="password"
              id="password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <InputWarning>Password is required!</InputWarning>
            )}
          </Label>
        </div>
        <SubmitButton type="submit" disabled={!isValid}>
          Sign In
        </SubmitButton>

        <ChangeForm onClick={alreadyHaveAccount}>
          Doesn't have an account?
        </ChangeForm>
      </FieldContainer>
    </FormContainer>
  );
}
