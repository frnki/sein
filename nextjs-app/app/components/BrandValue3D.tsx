"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);
const OrbitControls = dynamic(
  () => import("@react-three/drei").then((mod) => mod.OrbitControls),
  { ssr: false }
);
const PerspectiveCamera = dynamic(
  () => import("@react-three/drei").then((mod) => mod.PerspectiveCamera),
  { ssr: false }
);
const CustomerCentricModel = dynamic(
  () => import("./three/CustomerCentricModel"),
  { ssr: false }
);
const QualityModel = dynamic(() => import("./three/QualityModel"), {
  ssr: false,
});
const InnovationModel = dynamic(() => import("./three/InnovationModel"), {
  ssr: false,
});

interface BrandValue3DProps {
  modelType: "customer" | "quality" | "innovation";
}

export default function BrandValue3D({ modelType }: BrandValue3DProps) {
  return (
    <div className="h-[500px] w-full">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          {modelType === "customer" && <CustomerCentricModel />}
          {modelType === "quality" && <QualityModel />}
          {modelType === "innovation" && <InnovationModel />}
        </Suspense>
      </Canvas>
    </div>
  );
}
