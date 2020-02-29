import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { useHistory } from "react-router-dom";
import { css } from "@emotion/core";
import { ClipLoader, ClockLoader } from "react-spinners";
import {
	setPetName,
	setPetType
} from "../../redux/reducers/pageInfo.reducer.js";
import { resolveType } from "../../redux/effects/type.js";
import { resolveInfo } from "../../redux/effects/info.js";

const override = css`
	display: block;
	margin: 0 auto;
	border-color: red;
`;

class Details extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			typeResolved: false,
			infoResolved: false
		};
	}

	componentDidMount() {
		this.props.getType(this.props.petName);
	}

	componentDidUpdate(prevProps) {
		console.log(prevProps.typeInProgress, this.props.typeInProgress);
		if (prevProps.typeInProgress && !this.props.typeInProgress) {
			console.log("setting the state");
			this.setState({ typeResolved: true });
			console.log(this.state);
			setTimeout(() => this.props.getInfo(this.props.petType), 200);
		}
		if (prevProps.infoInProgress && !this.props.infoInProgress) {
			console.log("setting the state");
			this.setState({ infoResolved: true });

			console.log(this.state);
		}
	}

	render(props) {
		return (
			<div>
				<h1>Hello dear owner of {this.props.petName}</h1>

				{!this.state.typeResolved && (
					<div className="sweet-loading">
						<ClockLoader css={override} size={150} color="#123abc" loading />
					</div>
				)}
				{this.state.typeResolved && (
					<h2>
						{this.props.petName} is a {this.props.petType}
					</h2>
				)}
				{!this.state.infoResolved && (
					<div className="sweet-loading">
						<ClipLoader css={override} size={150} color="#123abc" loading />
					</div>
				)}
				{this.state.infoResolved && (
					<h2>
						{(() => {
							const info = this.props.info.find(
								inf => inf.petType === this.props.petType
							);
							return (
								<div>
									<p>
										dimensions: L:
										{info.len} W:
										{info.width} H:
										{info.height}
									</p>
									<p>eats: {info.eats.join(",")}</p>
									<p>body shape: has {info.legs_hands} hands and legs</p>
									<p>
										Weight {info.weight.min} to {info.weight.max} Kgs.
									</p>
									<p>{info.description} </p>
								</div>
							);
						})()}
					</h2>
				)}
			</div>
		);
	}
}

export default connect(
	state => ({
		petName: state.pageInfo.petName,
		petType: state.pageInfo.petType,
		typeInProgress: state.lookUp.inProgress,
		infoInProgress: state.info.inProgress,
		info: state.info.animals
	}),
	dispatch => ({
		getType: name => dispatch(resolveType(name)),
		getInfo: type => dispatch(resolveInfo(type))
	})
)(Details);
