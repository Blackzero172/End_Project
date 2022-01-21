import React from "react";

const CustomButton = ({ text, children, onClick, userID, edit }) => {
	return (
		<button type="button" onClick={onClick} userID={userID} edit={edit}>
			{children}
			{text}
		</button>
	);
};
export default CustomButton;
