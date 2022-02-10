import "./Dashboard.styles.css";
import CustomButton from "../../components/CustomButton/CustomButton.components";
import moment from "moment";
import { getWeekDays } from "../../utils/utils";
const Dashboard = () => {
	const today = moment("2022-02-27");
	const formattedDate = today.format("MMMM YYYY");
	const weekDays = getWeekDays(today);
	return (
		<div className="dashboard">
			<ul className="side-menu">
				<li>
					<CustomButton text="Schedule" />
				</li>
				<li>
					<CustomButton text="Users" />
				</li>
			</ul>
			<div className="main-content flex-items flex-column">
				<div className="month-selector flex-content">
					<i className="fas fa-chevron-left"></i>
					{formattedDate}
					<i className="fas fa-chevron-right"></i>
				</div>
				<div className="calendar">
					{weekDays.map((day) => {
						return <p>{day}</p>;
					})}
				</div>
			</div>
		</div>
	);
};
export default Dashboard;
