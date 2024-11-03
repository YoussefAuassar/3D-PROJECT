import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Horloge from "../public/Horloge";
import Watch from "../public/Watch";
import "./App.css";

function App() {
    const watches = [
        <Horloge key="horloge" position={[0, 0, 0]} scale={[8, 8, 8]} />,
        <Watch key="watch" position={[0, 0, 0]} scale={[8, 8, 8]} />
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [rotationSpeed, setRotationSpeed] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);

    const previousWatch = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? watches.length - 1 : prevIndex - 1));
    };

    const nextWatch = () => {
        setCurrentIndex((prevIndex) => (prevIndex === watches.length - 1 ? 0 : prevIndex + 1));
    };

    const rotateLeft = () => {
        setRotationSpeed((prevSpeed) => prevSpeed + 0.1);
    };

    const rotateRight = () => {
        setRotationSpeed((prevSpeed) => prevSpeed - 0.1);
    };

    const zoomIn = () => {
        setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2));
    };

    const zoomOut = () => {
        setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
    };

    return (
        <div className="app">
            <h1>ARKOUDA WATCH SERIE 1</h1>
            <div className="controls">
                <button onClick={previousWatch} className="arrow-button">{"<"}</button>
                <button onClick={nextWatch} className="arrow-button">{">"}</button>
            </div>
            <div className="absolute-controls">
                <button onClick={rotateLeft} className="control-button">Rotate Left</button>
                <button onClick={rotateRight} className="control-button">Rotate Right</button>
                <button onClick={zoomIn} className="control-button">Zoom In</button>
                <button onClick={zoomOut} className="control-button">Zoom Out</button>
            </div>
            <Canvas>
                <ambientLight intensity={1} />
                <OrbitControls />
                <Suspense fallback={null}>
                    <group rotation={[0, rotationSpeed, 0]} scale={[zoomLevel, zoomLevel, zoomLevel]}>
                        {watches[currentIndex]}
                    </group>
                </Suspense>
                <Environment preset="sunset" />
            </Canvas>
        </div>
    );
}

export default App;
