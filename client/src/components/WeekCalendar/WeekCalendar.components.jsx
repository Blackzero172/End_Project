import "./WeekCalendar.styles.css";
import Daycell from "./Daycell/Daycell.components";
const WeekCalendar = ({ weekDays, schedule, onClick }) => {
	return (
		<div className="week-calendar">
			<div className="calendar-header flex-items">
				<p>Type/Day</p>
				{weekDays.map((day) => {
					return <p className="header-cell">{day}</p>;
				})}
			</div>
			<div className="shift-types flex-evenly flex-column">
				<div className="flex-both flex-column">
					<p>Morning</p>
					<p>(7AM-3PM)</p>
				</div>
				<div className="flex-both flex-column">
					<p>Middle</p>
					<p>(1PM-9PM)</p>
				</div>
				<div className="flex-both flex-column">
					<p>Evening</p>
					<p>(3PM-11PM)</p>
				</div>
			</div>
			<div className="workers-container">
				{weekDays.map((day, index) => {
					schedule.days = schedule.days || [];
					day = schedule.days[index] || {};
					return <Daycell key={index} day={day} onClick={onClick} weekDay={index} />;
				})}
			</div>
		</div>
	);
};
export default WeekCalendar;
