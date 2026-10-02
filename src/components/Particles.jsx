import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aSize;
  attribute vec3 aTint;
  varying vec3 vTint;
  varying float vTwinkle;
  void main() {
    vTint = aTint;
    vec3 p = position;
    float sway = sin(uTime * 0.35 + p.y * 0.45) * 0.25;
    float swayZ = cos(uTime * 0.28 + p.x * 0.4) * 0.25;
    p.x += sway + uMouse.x * 0.9;
    p.y += swayZ * 0.5 + uMouse.y * 0.6;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float twinkle = 0.65 + 0.35 * sin(uTime * 1.8 + p.z * 3.0 + p.x * 2.0);
    vTwinkle = twinkle;
    gl_PointSize = aSize * twinkle * (140.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vTint;
  varying float vTwinkle;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float disc = smoothstep(0.5, 0.05, d);
    float core = smoothstep(0.18, 0.0, d) * 0.9;
    float alpha = disc * 0.55 * vTwinkle + core;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(vTint, alpha);
  }
`;

function lerpPalette(t, out) {
  // deep sky -> violet -> mint
  const stops = [
    [0.4, 0.83, 1.0],
    [0.55, 0.36, 0.96],
    [0.49, 0.94, 0.77],
  ];
  const seg = t * (stops.length - 1);
  const i = Math.min(Math.floor(seg), stops.length - 2);
  const f = seg - i;
  for (let c = 0; c < 3; c += 1) {
    out[c] = stops[i][c] + (stops[i + 1][c] - stops[i][c]) * f;
  }
  return out;
}

export default function Particles({ count = 1400, scrollRef }) {
  const points = useRef(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  const { positions, sizes, tints } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const tints = new Float32Array(count * 3);
    const tint = [0, 0, 0];
    for (let i = 0; i < count; i += 1) {
      const r = 4 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 10;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = spread;
      positions[i * 3 + 2] = Math.sin(theta) * r;
      sizes[i] = 0.35 + Math.random() * 1.35;
      lerpPalette(Math.random(), tint);
      tints[i * 3] = tint[0];
      tints[i * 3 + 1] = tint[1];
      tints[i * 3 + 2] = tint[2];
    }
    return { positions, sizes, tints };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    const target = state.pointer;
    mouse.current.x += (target.x - mouse.current.x) * 0.04;
    mouse.current.y += (target.y - mouse.current.y) * 0.04;
    uniforms.uMouse.value.copy(mouse.current);
    if (points.current) {
      points.current.rotation.y = t * 0.03;
      const scroll = scrollRef?.current ?? 0;
      points.current.rotation.x = scroll * 0.7;
      points.current.position.y = scroll * 2.0;
    }
    return Math.min(delta, 0.05);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aTint" args={[tints, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
