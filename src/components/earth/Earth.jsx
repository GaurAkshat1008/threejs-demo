import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

import EarthDayMap from "../../assets/textures/8k_earth_daymap.jpg";
import EarthNormalMap from "../../assets/textures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/textures/8k_earth_specular_map.jpg";
import EarthCloudsMap from "../../assets/textures/8k_earth_clouds.jpg";
import MoonMap from "../../assets/textures/4k_ceres_fictional.jpg";
import SunMap from "../../assets/textures/8k_sun.jpg";
import { TextureLoader } from "three";

export function Earth(props) {
  const [colorMap, normalMap, specularMap, cloudsMap, moonMap, sunMap] = useLoader(
    TextureLoader,
    [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap, MoonMap, SunMap]
  );

  const earthRef = useRef();
  const cloudsRef = useRef();
  const moonRef = useRef();
  const sunRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 6;
    cloudsRef.current.rotation.y = elapsedTime / 6;
    moonRef.current.rotation.x = moonRef.current.rotation.y += 0.01;
    sunRef.current.rotation.x = sunRef.current.rotation.y -= 0.01;
  });

  return (
    <>
      {/* <ambientLight intensity={1} /> */}
      <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={1.2} />
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh ref={cloudsRef} position={[0, 0, 3]}>
        <torusGeometry args={[2, 1, 64, 100]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite={true}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef} position={[0, 0, 3]}>
        <torusGeometry args={[2, 1, 64, 100]} />
        <meshPhongMaterial specularMap={specularMap} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.6}
          roughness={0.9}
        />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.4}
        />
      </mesh>
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 0, 3]}/>
      <mesh
        vivble
        castShadow
        rotation={[0, 0, 0]}
        ref={moonRef}
        position={[0, 0, 3]}
      >
        <torusGeometry args={[6, 3, 64, 100]} />
        <meshStandardMaterial metalness={1} map={moonMap} color="white" />
      </mesh>
      <mesh
        vivble
        castShadow
        rotation={[0, 0, 0]}
        ref={sunRef}
        position={[0, 0, 3]}
      >
        <torusGeometry args={[18, 9, 64, 100]} />
        <meshStandardMaterial metalness={1} map={sunMap} color="white" />
      </mesh>
    </>
  );
}
