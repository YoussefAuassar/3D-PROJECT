import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Horloge from "../public/Horloge";
import "./App.css";

function App() {
	return (
		<>
			<Canvas>
				<ambientLight intensity={1} />
				<OrbitControls  />
				<Suspense fallback={null}>
					<Horloge />
				</Suspense>
				<Environment preset="sunset" />
			</Canvas>
		</>
	);
}

export default App;
