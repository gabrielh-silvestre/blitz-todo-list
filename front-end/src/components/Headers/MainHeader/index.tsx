import { useState } from "react";
import Modal from "react-modal";
import { HiUserCircle } from "react-icons/hi";

import { DarkModeButton } from "../../Buttons/DarkModeButton";
import { SignInForm } from "../../Forms/SignInForm";
import { SignUpForm } from "../../Forms/SignUpForm";

import { ContentContainer, IconsContainer, Title } from "./styles";
import { userStore } from "../../../stores/user";
import { LogOutButton } from "../../Buttons/LogOutButton";

export function MainHeader() {
  const [hasAccount, setHasAccount] = useState(true);
  const [isSignInFormOpen, setIsSignInFormOpen] = useState(false);

  const { userToken } = userStore((state) => state);

  const handleOpenSignInForm = () => {
    setIsSignInFormOpen(true);
  };

  const handleCloseSignInForm = () => {
    setIsSignInFormOpen(false);
  };

  return (
    <>
      <ContentContainer>
        <Title>Tasks</Title>

        <IconsContainer>
          <DarkModeButton />
          {userToken ? (
            <LogOutButton />
          ) : (
            <button onClick={handleOpenSignInForm}>
              <HiUserCircle />
            </button>
          )}
        </IconsContainer>
      </ContentContainer>

      <Modal
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        isOpen={isSignInFormOpen}
        onRequestClose={handleCloseSignInForm}
      >
        {hasAccount ? (
          <SignInForm
            closeForm={() => setIsSignInFormOpen(false)}
            alreadyHaveAccount={() => setHasAccount(false)}
          />
        ) : (
          <SignUpForm
            closeForm={() => setIsSignInFormOpen(false)}
            alreadyHaveAccount={() => setHasAccount(true)}
          />
        )}
      </Modal>
    </>
  );
}
