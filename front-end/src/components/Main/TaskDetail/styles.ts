import tw from "tailwind-styled-components";

export const ContentContainer = tw.div`
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

export const TaskTitle = tw.h2`
  font-bold
  text-6xl
  text-primary-text
`;

export const DescriptionSection = tw.section`
  max-w-full
  max-h-md

  overflow-x-hidden
`;

export const TaskDescription = tw.p`
  text-lg
  text-secondary-text

  break-words
`;

export const SubTasksSection = tw.section`
  absolute

  w-full

  flex
  flex-col
  justify-between
  items-center

  bottom-0
  inset-x-0

  px-40
`;

export const SubTaskList = tw.ul`
  w-full

  flex
  flex-col
`;

export const NewButtonSection = tw.section`
  w-min
  h-min

  flex
  justify-center
  items-center

  p-4

  rounded-full

  text-4xl
  text-details

  bg-background
`;
