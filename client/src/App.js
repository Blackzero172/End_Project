import "./App.css";
import CustomInput from "./components/CustomInput/CustomInput.components";
import CustomButton from "./components/CustomButton/CustomButton.components";
import Spinner from "./components/Spinner/Spinner.components";
import { useEffect, useRef, useState } from "react";
import { getUsers, sortArray } from "./utils/utils";
function App() {
	const [data, setData] = useState([]);
	const [filteredData, filterData] = useState([]);
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
	const [sortingType, setSort] = useState(sortingTypes[0]);
	const spinnerRef = useRef();
	const getData = async () => {
		try {
			const users = await getUsers();
			spinnerRef.current.classList.add("hidden");
			setData(users.data);
			const sortedArray = [...sortArray(sortingType.isAsc, users.data, sortingType.type)];
			filterData(sortedArray);
		} catch (e) {
			console.log(e.message);
		}
	};
	useEffect(() => {
		getData();
	}, []);
	const searchUsers = (e) => {
		const name = e.target.value.toLowerCase();
		const filteredUsers = sortArray(
			false,
			data.filter((user) => user.name.toLowerCase().includes(name)),
			"cash"
		);
		filterData(filteredUsers);
	};
	const changeSort = () => {};
	return (
		<div>
			<div className="input-container">
				<CustomInput placeHolder="Enter username..." label="Name" onChange={searchUsers} />
				<CustomButton text="Sort By Cash: Highest to Lowest" label="Sorting Type" />
			</div>
			<div className="users-container">
				{filteredData.map((user) => {
					return (
						<div key={user._id}>
							<p>Name: {user.name}</p>
							<p>Cash: {user.cash}</p>
							<p>Credit: {user.credit}</p>
						</div>
					);
				})}
			</div>
			<Spinner spinnerRef={spinnerRef} />
		</div>
	);
}

export default App;
