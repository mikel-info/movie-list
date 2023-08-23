import "./App.css";
import SelectedMovies from "./components/SelectedMovies";
import MoviesOverview from "./containers/MoviesOverview";
import Navbar from "./containers/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div style={{ height: "100%" }}>
			<Navbar />
			<Routes>
				<Route path="/" exact element={<MoviesOverview />} />
				<Route path="/movie/:id" element={<SelectedMovies />} />
			</Routes>
		</div>
	);
}

export default App;
