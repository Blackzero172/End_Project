import "./EditMenu.styles.css";
const EditMenu = ({ user }) => {
	if (!user.name) {
		return <div className="right-menu"></div>;
	} else {
		return (
			<div className="right-menu">
				<div className="property">
					<label>Name:</label>
					<p>{user.name}</p>
				</div>
				<div className="property">
					<label>Cash:</label>
					<p>{user.cash}</p>
				</div>
				<div className="property">
					<label>Credit:</label>
					<p>{user.credit}</p>
				</div>
			</div>
		);
	}
};
export default EditMenu;
