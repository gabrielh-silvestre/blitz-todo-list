import tw from "tailwind-styled-components";

export const ContentContainer = tw.div`
  w-60
  h-full

  relative

  px-8
  py-2

  overflow-hidden
`;

export const FilterSection = tw.section`
  flex
  flex-col
`;

export const FilterLabel = tw.label`
  flex
  items-center

  font-semibold
  text-lg
  text-primary-text

  my-1
`;

export const FilterInput = tw.input`
  mr-4
`;

export const ListSection = tw.section`
  flex
  flex-col

  mt-4
`;

export const NewButtonSection = tw.section`
  flex
  justify-center
  items-center

  py-4

  absolute
  bottom-0
  inset-x-0

  text-4xl
  text-details

  bg-background
`;
