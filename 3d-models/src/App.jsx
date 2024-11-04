import { useState, useEffect, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Horloge from "../public/Horloge";
import Watch from "../public/Watch";
import { gsap } from "gsap";
import "./App.css";

function App() {
    const watches = [
        <Horloge key="horloge" position={[0, 0, 2]} scale={[12, 12, 12]} />,
        <Watch key="watch" position={[0, 0, 2]} scale={[12, 12, 12]} />
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [rotationSpeed, setRotationSpeed] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const groupRef = useRef();
    const titleRef = useRef();

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

    useEffect(() => {
        if (groupRef.current) {
            gsap.fromTo(
                groupRef.current.rotation,
                { x: 1 },
                { x: 0, duration: 1, ease: "power2.out" }
            );
        }
    }, [currentIndex]);

    useEffect(() => {
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            );
        }
    }, [currentIndex]);

    return (
        <div className="app">
            <h1 ref={titleRef}>{currentIndex === 0 ? "ARKOUDA WATCH 1" : "ARKOUDA WATCH 2"}</h1>
            <div className="controls">
                <button onClick={previousWatch} className="arrow-button">{"<"}</button>
                <button onClick={nextWatch} className="arrow-button">{">"}</button>
            </div>
            <div className="absolute-controls">
                <button onClick={rotateLeft} className="control-button">Rotate Left</button>
                <button onClick={rotateRight} className="control-button">RotateRight</button>
                <button onClick={zoomIn} className="control-button">+</button>
                <button onClick={zoomOut} className="control-button">-</button>
            </div>
            <Canvas camera={{ position: [0, 0, 10] }}>
                <ambientLight intensity={1} />
                <OrbitControls minDistance={5} maxDistance={15} />
                <Suspense fallback={null}>
                    <group ref={groupRef} rotation={[0, rotationSpeed, 0]} scale={[zoomLevel, zoomLevel, zoomLevel]}>
                        {watches[currentIndex]}
                    </group>
                </Suspense>
                <Environment preset="sunset" />
            </Canvas>
        </div>
    );
}

export default App;
