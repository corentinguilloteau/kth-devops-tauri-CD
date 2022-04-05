import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { listen, Event } from "@tauri-apps/api/event";

function App() {
	const [count, setCount] = useState(0);

	const [message, setMessage] = useState("");

	useEffect(() => {
		listen("tauri://update-status", function (res: Event<any>) {
			var m = "";
			if (res.payload.status === "ERROR") m = "Updater: " + res.payload.error;
			if (res.payload.status === "PENDING") m = "Updater: Downloading";
			if (res.payload.status === "DONE") m = "Updater: Finished, please restart";

			setMessage(m);
		});
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Hello Vite + React!</p>
				<p>
					<button type="button" onClick={() => setCount((count) => count + 1)}>
						count is: {count}
					</button>
				</p>
				<p>{message}</p>
				<p>
					Edit <code>App.tsx</code> and save to test HMR updates.
					<img
						src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/310/bug_1f41b.png"
						style={{ width: "2rem" }}></img>
				</p>
				<p>
					<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
						Learn React
					</a>
					{" | "}
					<a
						className="App-link"
						href="https://vitejs.dev/guide/features.html"
						target="_blank"
						rel="noopener noreferrer">
						Vite Docs
					</a>
				</p>
			</header>
		</div>
	);
}

export default App;
