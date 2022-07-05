import Modal from "react-modal";
import { Toaster } from "react-hot-toast";

import { SideTasks } from "./components/Aside/SideTasks";
import { MainHeader } from "./components/Headers/MainHeader";
import { TaskDetail } from "./components/Main/TaskDetail";
import { NewTaskForm } from "./components/Forms/NewTaskForm";

import { taskStore } from "./stores/task";

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
  const { editMode } = taskStore((state) => state);

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
          {editMode ? <NewTaskForm /> : <TaskDetail />}
        </MainContainer>
      </ContentContainer>
      <Toaster />
    </Container>
  );
}

export default App;
