import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Particles from './Particles.jsx';
import WireCore from './WireCore.jsx';

export default function Scene3D({ dpr = [1, 1.75] }) {
  const wrap = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={wrap} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 9], fov: 58 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor('#030811', 0)}
      >
        <Particles scrollRef={scrollRef} />
        <WireCore scrollRef={scrollRef} />
        <fog attach="fog" args={['#030811', 8, 20]} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(101,212,255,0.12),transparent_70%),radial-gradient(50%_40%_at_80%_80%,rgba(139,92,246,0.14),transparent_70%),radial-gradient(40%_35%_at_15%_75%,rgba(126,240,197,0.08),transparent_70%)]" />
    </div>
  );
}
