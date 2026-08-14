"use client";

import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type SystemCoreProps = {
    scrollProgress?: React.MutableRefObject<number>;
};

const nodes = [
    {
        position: [-1.7, 0.9, 0.2] as [number, number, number],
        label: "AI",
        color: "#765CFF",
    },
    {
        position: [1.7, 0.9, -0.1] as [number, number, number],
        label: "GO",
        color: "#00B8FF",
    },
    {
        position: [-1.9, -0.9, 0] as [number, number, number],
        label: "RAG",
        color: "#765CFF",
    },
    {
        position: [1.8, -0.9, 0.2] as [number, number, number],
        label: "JAVA",
        color: "#00B8FF",
    },
    {
        position: [0, 1.9, 0] as [number, number, number],
        label: "API",
        color: "#D8FF00",
    },
    {
        position: [0, -1.9, 0] as [number, number, number],
        label: "DOCKER",
        color: "#D8FF00",
    },
];

function SystemNode({
    position,
    label,
    color,
}: {
    position: [number, number, number];
    label: string;
    color: string;
}) {
    return (
        <group position={position}>
            <mesh>
                <sphereGeometry args={[0.12, 20, 20]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={2}
                />
            </mesh>

            <Html
                center
                position={[0, 0.25, 0]}
                style={{
                    color,
                    fontFamily: "monospace",
                    fontSize: "9px",
                    fontWeight: 700,
                    pointerEvents: "none",
                }}
            >
                {label}
            </Html>
        </group>
    );
}

export default function SystemCore({
    scrollProgress,
}: SystemCoreProps) {
    const root = useRef<THREE.Group>(null);
    const core = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (!root.current || !core.current) return;

        const mouseX = state.pointer.x;
        const mouseY = state.pointer.y;

        root.current.rotation.y += delta * 0.12;
        root.current.rotation.x += delta * 0.025;

        root.current.rotation.y +=
            (mouseX * 0.25 - root.current.rotation.y) * 0.01;

        root.current.rotation.x +=
            (-mouseY * 0.18 - root.current.rotation.x) * 0.01;

        core.current.rotation.x += delta * 0.3;
        core.current.rotation.y += delta * 0.4;

        const progress = scrollProgress?.current ?? 0;

        root.current.scale.setScalar(1 + progress * 0.2);
    });

    return (
        <group ref={root}>
            {/* Outer ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.7, 0.018, 12, 96]} />

                <meshStandardMaterial
                    color="#765CFF"
                    emissive="#765CFF"
                    emissiveIntensity={1.5}
                />
            </mesh>

            {/* Blue ring */}
            <mesh rotation={[Math.PI / 3, Math.PI / 5, 0]}>
                <torusGeometry args={[2.25, 0.012, 12, 80]} />

                <meshStandardMaterial
                    color="#00B8FF"
                    emissive="#00B8FF"
                    emissiveIntensity={1.5}
                />
            </mesh>

            {/* Inner ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.55, 0.025, 12, 72]} />

                <meshStandardMaterial
                    color="#D8FF00"
                    emissive="#D8FF00"
                    emissiveIntensity={1.2}
                />
            </mesh>

            {/* Main core */}
            <mesh ref={core}>
                <icosahedronGeometry args={[0.75, 1]} />

                <meshStandardMaterial
                    color="#17131F"
                    emissive="#765CFF"
                    emissiveIntensity={1.5}
                    metalness={0.8}
                    roughness={0.2}
                    wireframe
                />
            </mesh>

            {/* Inner core */}
            <mesh scale={0.3}>
                <icosahedronGeometry args={[1, 1]} />

                <meshStandardMaterial
                    color="#FFFFFF"
                    emissive="#765CFF"
                    emissiveIntensity={4}
                />
            </mesh>

            {/* Nodes */}
            {nodes.map((node) => (
                <SystemNode
                    key={node.label}
                    position={node.position}
                    label={node.label}
                    color={node.color}
                />
            ))}

            {/* Lighting */}
            <ambientLight intensity={0.5} />

            <pointLight
                position={[3, 3, 4]}
                intensity={30}
                color="#765CFF"
            />

            <pointLight
                position={[-4, -2, 3]}
                intensity={20}
                color="#00B8FF"
            />
        </group>
    );
}