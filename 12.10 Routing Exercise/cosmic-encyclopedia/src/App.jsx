import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import NavigateBackButton from "./components/NavigateBackButton.jsx";
import ContentPage from "./pages/ContentPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import data from "./Data.js";

import "./App.css";

function App() {
	return (
		<div className="main-container">
			<BrowserRouter>
				<NavBar tabs={data} />

				<Routes>
					<Route path="/" element={<HomePage />} />

					{data.map((tab) => (
						<Route key={tab.id} path={`/content/${tab.id}`} element={<ContentPage data={tab} />} />
					))}
				</Routes>

				<NavigateBackButton />
			</BrowserRouter>
		</div>
	);
}

export default App;
