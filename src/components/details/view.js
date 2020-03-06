import React from 'react';
import { connect } from 'react-redux';
import DetailsComponent from './show-details';

const DetailsView = ({ petName = '' }) => (
	<div>
		<h1>Hello dear owner of {petName}</h1>
		<DetailsComponent petName={petName} />
	</div>
);

const petNameSelector = state => state.pageInfo.petName;

const mapStateToProps = state => ({
	petName: petNameSelector(state),
});

export default connect(mapStateToProps)(DetailsView);
