"use client";

import { Canvas } from "@react-three/fiber";
import PhiModel from "@/model";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export function PhiScene() {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-green-500/30 bg-black/50">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} />
        <PhiModel followMouse={true} />
      </Canvas>
    </div>
  );
} 