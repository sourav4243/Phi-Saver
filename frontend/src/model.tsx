"use client";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";

interface PhiModelProps {
  followMouse?: boolean;
}

export function PhiModel({ followMouse = true }: PhiModelProps) {
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
    <group ref={group} position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]} rotation={[Math.PI,Math.PI,3*Math.PI/2]}>
      {/* Green circular background */}
      {/* <mesh position={[0, 0, -0.1]}>
        <circleGeometry args={[1.2, 64]} />
        <meshStandardMaterial color="#004d00" side={THREE.DoubleSide} />
      </mesh> */}

      {/* Circular part of phi (almost a full circle, slight gap for aesthetics) */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.5, 0.15, 32, 128, Math.PI * 1.70]} /> 
        <meshStandardMaterial color="#32cd32" flatShading={false} metalness={0.1} roughness={0.6} />
      </mesh>

      {/* Vertical stroke passing through center */}
      <mesh position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 1.8, 32]} />
        <meshStandardMaterial color="#32cd32" flatShading={false} metalness={0.1} roughness={0.6} />
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