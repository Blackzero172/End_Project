import React from "react";
import "./Spinner.styles.css";
class Spinner extends React.Component {
	render() {
		return (
			<div className="spinner" ref={this.props.spinnerRef}>
				<div className="full_circle"></div>
			</div>
		);
	}
}
export default Spinner;
