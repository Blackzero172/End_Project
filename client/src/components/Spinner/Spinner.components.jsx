import React from "react";
import "./Spinner.styles.css";
const Spinner = ({ spinnerRef }) => {
	return (
		<div className="spinner hidden" ref={spinnerRef}>
			<div className="full_circle"></div>
		</div>
	);
};
export default Spinner;
