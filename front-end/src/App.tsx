import { Toaster } from "react-hot-toast";

import { SideTasks } from "./components/Aside/SideTasks";
import { MainHeader } from "./components/Headers/MainHeader";
import { TaskDetail } from "./components/Main/TaskDetail";

import { userStore } from "./stores/user";

import {
  AsideContainer,
  Container,
  ContentContainer,
  HeaderContainer,
  MainContainer,
} from "./styles";

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiY2w0cTI4ZGdlMDAwMTNhODJ5aHQ1a2x4biJ9LCJpYXQiOjE2NTY5NzA1NDEsImV4cCI6MTY1NzIyOTc0MX0.88erZTM1xlSAOvaHS8IS3oB1hRq5y4kibLAIyudmW9k";

function App() {
  userStore.setState({ userToken: TOKEN });

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
