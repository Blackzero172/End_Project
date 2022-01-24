import "./App.css";
import CustomInput from "./components/CustomInput/CustomInput.components";
import CustomButton from "./components/CustomButton/CustomButton.components";
import UserCard from "./components/UserCard/UserCard.components";
import EditMenu from "./components/EditMenu/EditMenu.components";
import Spinner from "./components/Spinner/Spinner.components";
import LoginPage from "./pages/LoginPage/LoginPage.pages";
import { useEffect, useRef, useState } from "react";
import {
	getAccounts,
	sortArray,
	capFirstLetter,
	selectItem,
	searchArray,
	loginRequest,
	logoutRequest,
	displayErrorMessage,
} from "./utils/utils";
let timerID;
function App() {
	const [data, setData] = useState([]);
	const [filteredData, filterData] = useState([]);
	const [selectedUser, selectUser] = useState({});
	const [loggedInUser, loginUser] = useState({});
	const [targetUser, selectTargetUser] = useState({});
	const [currentSorting, setSort] = useState(0);
	const [currentAction, setAction] = useState("");
	let token = window.localStorage.getItem("token");
	const emailRef = useRef();
	const passRef = useRef();
	const spinnerRef = useRef();
	const usersRef = useRef();
	const loginErrorTextRef = useRef();
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
	const setLoading = (state) => {
		if (state) spinnerRef.current.classList.remove("hidden");
		else if (!state) spinnerRef.current.classList.add("hidden");
	};
	const getData = async () => {
		try {
			const accounts = await getAccounts();
			if (!accounts) {
				setData([]);
			} else {
				setData(accounts.data);
			}
			setLoading(false);
			const sortedArray = sortArray(
				sortingTypes[currentSorting].isAsc,
				accounts.data,
				sortingTypes[currentSorting].type
			);
			filterData(sortedArray);
		} catch (e) {
			console.log(e);
		}
	};
	const login = async () => {
		try {
			let user;
			if (!token) {
				const [email, password] = [emailRef.current.value.toLowerCase(), passRef.current.value];
				user = await loginRequest(email, password);
				window.localStorage.setItem("token", user.data.genToken);
			}
			if (token) {
				user = await loginRequest("", "", token);
			}
			loginUser(user.data.user);
		} catch (e) {
			timerID = displayErrorMessage(loginErrorTextRef, e.response.data, timerID);
		}
	};
	const logout = async () => {
		try {
			const token = window.localStorage.getItem("token");
			const res = await logoutRequest(token);
			window.localStorage.removeItem("token");
			loginUser({});
			console.log(res);
		} catch (e) {
			console.error(e.response);
		}
	};
	useEffect(() => {
		if (token) login();
	}, []);
	useEffect(() => {
		if (selectedUser._id) selectUser(data.find((user) => user._id === selectedUser._id));
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
		if (typeof e === "object") {
			if (e.hasOwnProperty("target") && e.target.getAttribute("userid")) {
				const id = selectItem(usersRef, e.target.getAttribute("userid"));
				if (id) selectUser(data.find((user) => user._id === id));
			} else {
				console.log(e);
				selectUser(e);
				selectItem(usersRef, e._id);
			}
		} else {
			selectItem(usersRef, "");
			selectUser({});
		}
	};
	const updateAction = (e) => {
		if (typeof e === "object") setAction(e.target.getAttribute("action"));
		else setAction(e);
		selectTargetUser({});
	};
	const setTargetUser = (e, ref) => {
		const id = e.target.getAttribute("userid");
		if (id) {
			const user = data.find((user) => user._id === id);
			selectTargetUser(user);
			ref.current.value = user.name;
		} else {
			selectTargetUser({});
			ref.current.value = "";
		}
	};
	if (!loggedInUser.hasOwnProperty("name"))
		return (
			<LoginPage onClick={login} emailRef={emailRef} passRef={passRef} errorTextRef={loginErrorTextRef} />
		);
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
				setUser={selectNewUser}
				targetUser={targetUser}
				setAction={updateAction}
				currentAction={currentAction}
				data={data}
				getData={getData}
				setLoading={setLoading}
				setTargetUser={setTargetUser}
				logout={logout}
			/>
			<Spinner spinnerRef={spinnerRef} />
		</div>
	);
}

export default App;
