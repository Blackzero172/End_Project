import React from "react";
import "./CustomInput.styles.css";
const CustomInput = ({ type, onChange, placeHolder, label, name }) => {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				onChange={onChange}
				placeholder={placeHolder}
				id={name}
				onClick={(e) => e.stopPropagation()}
			/>
		</div>
	);
};
export default CustomInput;
