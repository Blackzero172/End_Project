import "./Dashboard.styles.css";
import CustomButton from "../../components/CustomButton/CustomButton.components";
const Dashboard = () => {
	return (
		<div className="dashboard">
			<ul>
				<li>
					<CustomButton text="Users" />
				</li>
				<li>
					<CustomButton text="Users" />
				</li>
				<li>
					<CustomButton text="Users" />
				</li>
				<li>
					<CustomButton text="Users" />
				</li>
			</ul>
		</div>
	);
};
export default Dashboard;
