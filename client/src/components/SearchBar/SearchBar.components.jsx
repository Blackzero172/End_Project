import CustomInput from "../CustomInput/CustomInput.components";
import { searchArray } from "../../utils/utils";
import { useState, useRef } from "react";
import "./SearchBar.styles.css";
import CustomButton from "../CustomButton/CustomButton.components";
let timerID;
const SearchBar = ({ label, data, selectUser }) => {
	const [results, setResults] = useState([]);
	const resultRef = useRef();
	const searchRef = useRef();
	const notFoundRef = useRef();
	const search = (e) => {
		if (timerID) clearTimeout(timerID);
		if ((e.target && e.target.value === "") || e === "") {
			resultRef.current.classList.add("hidden");
			return setResults([]);
		}
		timerID = setTimeout(() => {
			const results = searchArray(data, e.target.value);
			const notFoundText = notFoundRef.current;
			notFoundText.classList.add("hidden");
			if (results.length <= 0) {
				setResults([]);
				notFoundText.classList.remove("hidden");
			} else setResults(results);
			resultRef.current.classList.remove("hidden");
		}, 500);
	};
	return (
		<div className="search-bar">
			<CustomInput
				placeHolder="Enter Receiver's Name..."
				label={label}
				onChange={search}
				inputRef={searchRef}
				required
			/>
			<div className="result-container hidden" ref={resultRef}>
				{results.map((result) => {
					return (
						<CustomButton
							key={result._id}
							text={`Cash:${result.cash}`}
							type="button"
							userid={result._id}
							onClick={(e) => {
								selectUser(e, searchRef);
								search("");
							}}
						>
							<p>{result.name}</p>
						</CustomButton>
					);
				})}
				<p ref={notFoundRef}>No Users Found</p>
			</div>
		</div>
	);
};
export default SearchBar;
