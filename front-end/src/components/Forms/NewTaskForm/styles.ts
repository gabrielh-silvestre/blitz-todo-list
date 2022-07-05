import tw from "tailwind-styled-components";

export const FormContainer = tw.form`
  relative

  h-full

  flex
  flex-col
`;

export const PrimarySection = tw.section`
  flex
  flex-col
  justify-center

  mb-16

  text-secondary-text
`;

export const InfoContainer = tw.div`
  flex
  justify-between
  items-center

  text-3xl
`;

export const TaskTitleInput = tw.input`
  pl-4

  font-bold
  text-6xl
  text-primary-text

  shadow

  rounded-md
`;

export const DescriptionSection = tw.section`
  max-w-full
  h-28

  pl-4

  shadow

  rounded-md

  overflow-x-hidden
`;

export const TaskDescriptionInput = tw.textarea`
  w-full
  h-full

  break-words
`;

export const NewButtonSection = tw.section`
  w-full
  h-full

  flex
  justify-center
  items-center

  p-4

  rounded-full

  text-8xl
  text-details

  bg-background
`;

export const InputWarning = tw.span`
  text-sm
  text-red-600
`;
