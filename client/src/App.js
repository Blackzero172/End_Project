import "./App.css";
import CustomInput from "./components/CustomInput/CustomInput.components";
import CustomButton from "./components/CustomButton/CustomButton.components";
import UserCard from "./components/UserCard/UserCard.components";
import EditMenu from "./components/EditMenu/EditMenu.components";
import Spinner from "./components/Spinner/Spinner.components";
import { useEffect, useRef, useState } from "react";
import { getUsers, sortArray, capFirstLetter, selectItem, searchArray } from "./utils/utils";
function App() {
	const [data, setData] = useState([]);
	const [filteredData, filterData] = useState([]);
	const [selectedUser, selectUser] = useState({});
	const [currentSorting, setSort] = useState(0);
	const [currentAction, setAction] = useState("");
	const spinnerRef = useRef();
	const usersRef = useRef();
	const sortingTypes = [
		{
			type: "cash",
			isAsc: false,
		},
		{
			type: "cash",
			isAsc: true,
		},
		{
			type: "credit",
			isAsc: false,
		},
		{
			type: "credit",
			isAsc: true,
		},
	];
	const setLoading = () => {
		spinnerRef.current.classList.remove("hidden");
	};
	const getData = async () => {
		try {
			const users = await getUsers();
			console.log("Getting Data", users);
			spinnerRef.current.classList.add("hidden");
			setData(users.data);
			const sortedArray = sortArray(
				sortingTypes[currentSorting].isAsc,
				users.data,
				sortingTypes[currentSorting].type
			);
			filterData(sortedArray);
		} catch (e) {
			console.log(e.message);
		}
	};
	useEffect(() => {
		getData();
	}, []);
	useEffect(() => {
		if (selectedUser) selectUser(selectedUser._id);
	}, [data]);
	const searchUsers = (e) => {
		const name = e.target.value.toLowerCase();
		const filteredUsers = sortArray(false, searchArray(data, name), "cash");
		if (!filteredUsers.includes(selectedUser)) selectUser({});
		filterData(filteredUsers);
	};
	const changeSort = () => {
		let currentTypeIndex = currentSorting;
		currentTypeIndex++;
		if (currentTypeIndex > 3) currentTypeIndex = 0;
		setSort(currentTypeIndex);
		const newArr = sortArray(
			sortingTypes[currentTypeIndex].isAsc,
			filteredData,
			sortingTypes[currentTypeIndex].type
		);
		filterData(newArr);
	};
	const selectNewUser = (e) => {
		updateAction("");
		const id = selectItem(usersRef, e.target.getAttribute("userid"));
		if (id) selectUser(data.find((user) => user._id === id));
		else selectUser({});
	};
	const updateAction = (e) => {
		if (e !== "") setAction(e.target.getAttribute("action"));
		else setAction(e);
	};
	return (
		<div className="app">
			<div className="left-menu" onClick={selectNewUser}>
				<div className="input-container">
					<CustomInput placeHolder="Enter username..." label="Name" onChange={searchUsers} />
					<CustomButton
						text={`Sort By ${capFirstLetter(sortingTypes[currentSorting].type)}: ${
							sortingTypes[currentSorting].isAsc ? "Lowest to Highest" : "Highest to Lowest"
						}`}
						label="Sorting Type"
						onClick={(e) => {
							e.stopPropagation();
							changeSort();
						}}
						type="link"
					/>
				</div>
				<div className="users-container" ref={usersRef}>
					{filteredData.map((user) => {
						return <UserCard key={user._id} userid={user._id} onClick={selectNewUser} user={user} />;
					})}
				</div>
			</div>
			<EditMenu
				user={selectedUser}
				setAction={updateAction}
				currentAction={currentAction}
				data={data}
				getData={getData}
				setLoading={setLoading}
			/>
			<Spinner spinnerRef={spinnerRef} />
		</div>
	);
}

export default App;
