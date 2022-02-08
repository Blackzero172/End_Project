const submitOnEnter = (e) => {
	if (e.keyCode === 13) {
		e.onClick();
	}
};

export { submitOnEnter };
