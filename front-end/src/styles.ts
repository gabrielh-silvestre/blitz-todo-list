import tw from "tailwind-styled-components";

export const Container = tw.div`
  h-screen
  w-screen

  flex
  flex-col

  overflow-hidden

  text-primary-text
`;

export const ContentContainer = tw.div`
  h-full
  w-full

  flex
`;

export const HeaderContainer = tw.header`
  h-min

  px-8
  py-1

  row-span-1

  text-background

  bg-details
`;

export const AsideContainer = tw.aside`
  h-full
  w-min
`;

export const MainContainer = tw.main`
  h-full
  w-full

  px-14
  py-8
`;
