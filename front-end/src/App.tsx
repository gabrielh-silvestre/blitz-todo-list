import Modal from "react-modal";
import { Toaster } from "react-hot-toast";

import { SideTasks } from "./components/Aside/SideTasks";
import { MainHeader } from "./components/Headers/MainHeader";
import { TaskDetail } from "./components/Main/TaskDetail";

import {
  AsideContainer,
  Container,
  ContentContainer,
  HeaderContainer,
  MainContainer,
} from "./styles";

import "./App.css";

Modal.setAppElement("#root");

function App() {
  return (
    <Container>
      <HeaderContainer>
        <MainHeader />
      </HeaderContainer>

      <ContentContainer>
        <AsideContainer>
          <SideTasks />
        </AsideContainer>

        <MainContainer>
          <TaskDetail />
        </MainContainer>
      </ContentContainer>
      <Toaster />
    </Container>
  );
}

export default App;
