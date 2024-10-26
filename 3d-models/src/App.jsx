import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Horloge from "../public/Horloge";
import Watch from "../public/Watch";
import "./App.css";

function App() {
    return (
        <>
            <Canvas>
                <ambientLight intensity={1} />
                <OrbitControls />
                <Suspense fallback={null}>
                    <Horloge position={[0, 0, 0]} scale={[8, 8, 8]} /> 
                </Suspense>
                <Environment preset="sunset" />
            </Canvas>
        </>
    );
}

export default App;
