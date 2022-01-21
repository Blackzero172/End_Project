import "./App.css";
import CustomInput from "./components/CustomInput/CustomInput.components";
import CustomButton from "./components/CustomButton/CustomButton.components";
function App() {
	return (
		<div>
			<div className="input-container">
				<CustomInput placeHolder="Enter username..." />
				<CustomButton text="Sort By:Highest to Lowest" />
				<CustomButton text="Sort By:Highest to Lowest" />
			</div>
		</div>
	);
}

export default App;
