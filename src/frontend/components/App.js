import Navigation from "../components/Navbar";
import "../Styles/App.css";
import ParticleBackground from "../components/Particles";
import Minting from "./Minting";

import { useState } from "react";

function App() {
	const [accounts, setAccounts] = useState([]);

	return (
		<div className="App">
			<ParticleBackground />
			<Navigation accounts={accounts} setAccounts={setAccounts} />
			<Minting accounts={accounts} setAccounts={setAccounts} />
		</div>
	);
}

export default App;
