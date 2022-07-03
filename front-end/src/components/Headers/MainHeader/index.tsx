import { HiUserCircle } from "react-icons/hi";

import { DarkModeButton } from "../../Buttons/DarkModeButton";

import { ContentContainer, IconsContainer, Title } from "./styles";

export function MainHeader() {
  return (
    <>
      <ContentContainer>
        <Title>Tasks</Title>

        <IconsContainer>
          <DarkModeButton />
          <button>
            <HiUserCircle />
          </button>
        </IconsContainer>
      </ContentContainer>
    </>
  );
}
