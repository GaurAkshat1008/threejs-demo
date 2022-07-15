import "./App.css";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from './components/earth/Earth';


function App() {
  const Container = styled.div`
    width: 100vw;
    height: 100vh;
  `;
  return (
    <div className="app">
      <Container>
        <Canvas camera={{position:[48, 10, 50]}}>
          <Suspense fallback={null}>
            <Earth />
          </Suspense>
        </Canvas>
      </Container>
    </div>
  );
}

export default App;
