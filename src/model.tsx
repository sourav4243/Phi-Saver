"use client";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";

interface PhiModelProps {
  followMouse?: boolean;
}

function PhiModel({ followMouse = true }: PhiModelProps) {
  const group = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Track mouse movement
  useEffect(() => {
    if (followMouse) {
      const handleMouseMove = (event: MouseEvent) => {
        mouseRef.current = {
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1,
        };
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [followMouse]);

  // Animation (rotation + floating)
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1;

      // Mouse interaction
      if (followMouse) {
        group.current.rotation.y += mouseRef.current.x * 0.05;
        group.current.rotation.x += mouseRef.current.y * 0.05;
      }
    }
  });

  return (
    <group ref={group} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]}>
      {/* Green circular background */}
      <mesh position={[0, 0, -0.1]}>
        <circleGeometry args={[1.2, 64]} />
        <meshStandardMaterial color="#004d00" side={THREE.DoubleSide} />
      </mesh>

      {/* Phi shape */}
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.5, 0.12, 16, 32, Math.PI * 1.6]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <mesh position={[-0.3, -0.15, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.12, 0.12, 1.6, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>

      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.17, 0.08, 0.4, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}

export default function PhiScene() {
  return (
    <Canvas style={{ background: "transparent" }} camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={1} />
      <PhiModel />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}