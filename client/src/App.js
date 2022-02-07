import "./App.css";
import Router from "./Router/Router";
import Spinner from "./components/Spinner/Spinner.components";
import { BrowserRouter } from "react-router-dom";
function App() {
	return (
		<BrowserRouter>
			<Router />
			<Spinner />
		</BrowserRouter>
	);
}

export default App;
