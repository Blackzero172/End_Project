import React from "react";
import "./Spinner.styles.css";
const Spinner = ({ spinnerRef }) => {
	return (
		<div className="spinner hidden" ref={spinnerRef}>
			<div className="color-dots">
				<div className="dot-1"></div>
				<div className="dot-2"></div>
				<div className="dot-3"></div>
			</div>
		</div>
	);
};
export default Spinner;
