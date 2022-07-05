import tw from "tailwind-styled-components";

export const ContentContainer = tw.li`
  flex
  justify-between
  items-center
`;

export const TaskTitle = tw.h4`
  mx-2

  font-semibold
  text-lg

  cursor-pointer
`;

export const ButtonContainer = tw.div`
  first-of-type:mr-2

  text-2xl
`;
