import "./App.css";
import CustomInput from "./components/CustomInput/CustomInput.components";
import CustomButton from "./components/CustomButton/CustomButton.components";
import Spinner from "./components/Spinner/Spinner.components";
import { useEffect, useRef, useState } from "react";
import { getUsers } from "./utils/utils";
function App() {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [filteredData, filterData] = useState([]);
	const [sortingType, setSort] = useState("cashHigh");
	const spinnerRef = useRef();
	const getData = async () => {
		try {
			const users = await getUsers();
			spinnerRef.current.classList.add("hidden");
			setLoading(false);
			setData(users.data);
			filterData(users.data);
		} catch (e) {
			console.log(e.message);
		}
	};
	useEffect(() => {
		getData();
	}, []);
	const searchUsers = async (e) => {
		const name = e.target.value.toLowerCase();
		const filteredUsers = data.filter((user) => user.name.toLowerCase().includes(name));
		filterData(filteredUsers);
	};
	const changeSort = async (e) => {};
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
