import api from "../api/api";

const getUsers = async () => {
	const users = await api.get("/users");
	return users;
};
const sortArray = (isAsc, arr, prop) => {
	const arrCopy = [...arr];
	if (!isAsc) arrCopy.sort((a, b) => b[prop] - a[prop]);
	else arrCopy.sort((a, b) => a[prop] - b[prop]);
	return arrCopy;
};
const capFirstLetter = (string) => {
	return string[0].toUpperCase() + string.substring(1);
};
const selectItem = (ref, id) => {
	const refChildren = Array.from(ref.current.children);
	let correctId;
	refChildren.forEach((child) => {
		if (child.getAttribute("userid") !== id) child.classList.remove("selected");
		else {
			correctId = child.getAttribute("userid");
			child.classList.add("selected");
		}
	});
	return correctId;
};
const searchArray = (arr, query) => {
	const newArr = arr.filter((item) => item.name.includes(query));
	return newArr;
};
export { getUsers, sortArray, capFirstLetter, selectItem, searchArray };
