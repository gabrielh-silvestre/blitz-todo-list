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

function App() {
  return (
    <Container>
      <HeaderContainer>
        <MainHeader />
      </HeaderContainer>

      <ContentContainer>
        <AsideContainer>
          <SideTasks tasks={[]} />
        </AsideContainer>

        <MainContainer>
          <TaskDetail />
        </MainContainer>
      </ContentContainer>
    </Container>
  );
}

export default App;
