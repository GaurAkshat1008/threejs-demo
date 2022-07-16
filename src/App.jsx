import "./App.css";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "./components/earth/Earth";
import { Content } from "./components/content";
import { Stars } from "@react-three/drei";

function App() {
  const Container = styled.div`
    width: 100vw;
    height: 100vh;
  `;
  return (
    <>
      <Canvas camera={{position:[0, 0, 0]}}>
        <Suspense fallback={null}>
          <Earth />
          <Stars
            radius={100}
            depth={60}
            count={20000}
            factor={10}
            saturation={0}
            fade={true}
          />
        </Suspense>
      </Canvas>
      <Content />
    </>
  );
}

export default App;
