import { useForm, SubmitHandler } from "react-hook-form";

import type { FormInput, SignUpFormProps } from "./propTypes";

import { useSignUpUser } from "../../../stores/user/useCases";

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

export function SignUpForm({ alreadyHaveAccount, closeForm }: SignUpFormProps) {
  const { mutateAsync } = useSignUpUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInput>({
    defaultValues: { name: "", email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormInput> = (data, e) => {
    e?.preventDefault();

    closeForm();
    mutateAsync(data);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FieldContainer>
        <FieldLegend>Sign Up</FieldLegend>

        <div>
          <Label htmlFor="name">
            Name:
            <TextInput
              type="text"
              id="name"
              {...register("name", {
                required: { value: true, message: "Name is required!" },
                min: { value: 3, message: "Name is to short!" },
                max: { value: 20, message: "Name is to long!" },
              })}
            />
            {errors.name && <InputWarning>Name is invalid!</InputWarning>}
          </Label>

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
            {errors.email && <InputWarning>Email is invalid!</InputWarning>}
          </Label>

          <Label htmlFor="password">
            Password:
            <TextInput
              type="password"
              id="password"
              {...register("password", {
                required: { value: true, message: "Password is required!" },
                minLength: { value: 8, message: "Password is too short!" },
                maxLength: { value: 16, message: "Password is too long!" },
              })}
            />
            {errors.password && (
              <InputWarning>Password is invalid!</InputWarning>
            )}
          </Label>
        </div>
        <SubmitButton type="submit" disabled={!isValid}>
          Sign Up
        </SubmitButton>

        <ChangeForm onClick={alreadyHaveAccount}>
          Already have an account?
        </ChangeForm>
      </FieldContainer>
    </FormContainer>
  );
}
