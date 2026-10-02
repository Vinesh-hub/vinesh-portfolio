import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function WireCore({ scrollRef }) {
  const core = useRef(null);
  const halo = useRef(null);

  const pulse = useMemo(() => ({ value: 0 }), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const scroll = scrollRef?.current ?? 0;
    if (core.current) {
      core.current.rotation.x = t * 0.12 + scroll * 1.4;
      core.current.rotation.y = t * 0.18 + scroll * 2.0;
      const s = 1 + Math.sin(t * 1.4) * 0.03;
      core.current.scale.setScalar(s);
    }
    if (halo.current) {
      halo.current.rotation.x = -t * 0.08;
      halo.current.rotation.z = t * 0.1 + scroll;
      const s = 1 + Math.cos(t * 1.1) * 0.02;
      halo.current.scale.setScalar(s);
    }
    pulse.value = t;
  });

  return (
    <group position={[3.4, 0.4, -3.2]}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color="#65d4ff" wireframe transparent opacity={0.32} />
      </mesh>
      <mesh ref={halo}>
        <torusGeometry args={[1.9, 0.02, 12, 140]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.4, 0]}>
        <torusGeometry args={[2.35, 0.012, 12, 140]} />
        <meshBasicMaterial color="#7ef0c5" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
