import React from "react";

const CustomInput = ({ type, onChange, placeHolder, label, name }) => {
	return (
		<>
			<label htmlFor="name">{label}</label>
			<input type={type} onChange={onChange} placeholder={placeHolder} id={name} />
		</>
	);
};
export default CustomInput;
