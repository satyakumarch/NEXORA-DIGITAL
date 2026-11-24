import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import type { Group } from "three";

const TEAL = "#2bb5a5";

function Shapes() {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);
    g.rotation.y += dt * 0.12;
    g.rotation.x += (state.pointer.y * 0.25 - g.rotation.x) * (1 - Math.exp(-3 * dt));
    g.position.x += (state.pointer.x * 0.4 - g.position.x) * (1 - Math.exp(-3 * dt));
  });
  return (
    <group ref={group} position={[3.4, 0.3, -1]} scale={0.62}>
      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.4}>
        <mesh>
          <icosahedronGeometry args={[1.25, 1]} />
          <MeshDistortMaterial color={TEAL} metalness={0.6} roughness={0.25} distort={0.25} speed={1.5} />
        </mesh>
      </Float>
      <Float speed={2.2} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-1.9, 1.3, -1]}>
          <torusKnotGeometry args={[0.38, 0.12, 120, 16]} />
          <meshStandardMaterial color="#e8eef2" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.8}>
        <mesh position={[1.4, -1.5, -0.5]}>
          <octahedronGeometry args={[0.45]} />
          <meshStandardMaterial color={TEAL} wireframe />
        </mesh>
      </Float>
      <Float speed={1.2} floatIntensity={1}>
        <mesh position={[0.2, 1.9, -2]} rotation={[1.2, 0, 0]}>
          <torusGeometry args={[0.7, 0.03, 16, 80]} />
          <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={0.6} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={(s) => s.gl.domElement.parentElement?.parentElement?.setAttribute("data-scene-ready", "")}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 3]} intensity={1.6} />
        <pointLight position={[-3, -2, 2]} intensity={8} color={TEAL} />
        <Environment>
          <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
          <Lightformer intensity={1} color={TEAL} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
        </Environment>
        <Shapes />
      </Canvas>
    </div>
  );
}
