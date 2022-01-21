import React from "react";
import "./Spinner.styles.css";
const Spinner = ({ spinnerRef }) => {
	return (
		<div className="spinner" ref={spinnerRef}>
			<div className="full_circle"></div>
		</div>
	);
};
export default Spinner;
