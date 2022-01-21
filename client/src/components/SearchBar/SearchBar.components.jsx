import CustomInput from "../CustomInput/CustomInput.components";
import { searchArray } from "../../utils/utils";
import { useState, useRef } from "react";
import "./SearchBar.styles.css";
import CustomButton from "../CustomButton/CustomButton.components";
let timerID;
const SearchBar = ({ label, data }) => {
	const resultRef = useRef();
	const [results, setResults] = useState([]);
	const search = (e) => {
		if (timerID) clearTimeout(timerID);
		if (e.target.value === "") {
			resultRef.current.classList.add("hidden");
			return setResults([]);
		}
		timerID = setTimeout(() => {
			const results = searchArray(data, e.target.value);
			setResults(results);
			resultRef.current.classList.remove("hidden");
		}, 500);
	};
	return (
		<div className="search-bar">
			<CustomInput placeHolder="Enter Receiver's Name..." label={label} onChange={search} />
			<div className="result-container hidden" ref={resultRef}>
				{results.map((result) => {
					return (
						<CustomButton key={result._id} text={`Cash:${result.cash}`} type="button">
							<p>{result.name}</p>
						</CustomButton>
					);
				})}
			</div>
		</div>
	);
};
export default SearchBar;
