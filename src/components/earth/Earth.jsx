import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";

import MoonMap from "../../assets/textures/4k_ceres_fictional.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import SunMap from "../../assets/textures/8k_sun.jpg";
import MeMap from "../../assets/textures/me.jpg";
import SpaceMap from "../../assets/textures/space.jpg";

import { TextureLoader } from "three";
export function Earth(props) {
  const [
    colorMap,
    normalMap,
    specularMap,
    cloudsMap,
    moonMap,
    sunMap,
    meMap,
    spaceMap,
  ] = useLoader(TextureLoader, [
    EarthDayMap,
    EarthNormalMap,
    EarthSpecularMap,
    EarthCloudsMap,
    MoonMap,
    SunMap,
    MeMap,
    SpaceMap,
  ]);

  const moonRef = useRef();
  const sunRef = useRef();
  const meRef = useRef();

  useFrame(({ clock, scene, gl, camera }) => {
    const elapsedTime = clock.getElapsedTime();
    moonRef.current.rotation.x = moonRef.current.rotation.y += 0.01;
    sunRef.current.rotation.x = sunRef.current.rotation.y -= 0.01;
    meRef.current.rotation.x = meRef.current.rotation.y -= 0.01;
    scene.background = spaceMap;
    moonRef.current.position.x = -10;
    moonRef.current.position.z = 30;
    meRef.current.position.set(0, 0, -7);
    window.addEventListener("scroll", () => {
      const t = document.body.getBoundingClientRect().top;
      camera.position.z = t * -0.01;
      camera.position.x = t * -0.0002;
      camera.rotation.y = t * -0.0002;
    });
  });
  return (
    <>
      <pointLight color="#f6f3ea" position={[50, 10, 3]} intensity={1.2} />
      <directionalLight position={[50, 0, 3]} />
      <mesh visible castShadow rotation={[0, 0, 0]} ref={moonRef}>
        <torusGeometry args={[2, 1, 64, 100]} />
        <meshStandardMaterial metalness={1} map={moonMap} color="white" />
      </mesh>
      <mesh visible castShadow rotation={[0, 0, 0]} ref={sunRef}>
        <torusGeometry args={[6, 3, 64, 100]} />
        <meshStandardMaterial metalness={1} map={sunMap} color="white" />
      </mesh>
      <mesh ref={meRef}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial metalness={0} map={meMap} />
      </mesh>
    </>
  );
}
