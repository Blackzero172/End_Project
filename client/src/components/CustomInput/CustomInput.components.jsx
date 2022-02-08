import React from "react";
import "./CustomInput.styles.css";
const CustomInput = ({ type, onChange, placeHolder, label, name, inputRef, required, autocomplete }) => {
	return (
		<div className="input">
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				onChange={onChange}
				placeholder={placeHolder}
				id={name}
				onClick={(e) => e.stopPropagation()}
				ref={inputRef}
				required={required}
				autoComplete={autocomplete}
			/>
		</div>
	);
};
export default CustomInput;
