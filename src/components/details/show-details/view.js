import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ClockLoader } from 'react-spinners';
import { override } from '../styles.js';
import InfoComponent from '../show-info';
import withInit from '../../higher-order/with-init';
import withProps from '../../higher-order/with-props';
import { resolveType } from '../../../redux/effects/type.js';
import { isValidCache } from '../../../redux/helpers.js';

const TopSpinner = () => (
	<div className="sweet-loading">
		<ClockLoader css={override} size={150} color="#123abc" loading />
	</div>
);

const ShowDetailsBody = ({ petName, nameType: { petType } }) => (
	<div>
		<h2>
			{petName} is a {petType}
		</h2>
		<InfoComponent petType={petType} />
	</div>
);

const nameTypesSelector = state => state.lookUp.nameTypes;
const tipSelector = state => state.lookUp.inProgress;

const mapStateToProps = state => ({
	nameTypes: nameTypesSelector(state),
	typeInProgress: tipSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getType: name => dispatch(resolveType(name)),
});

const extraProps = ({ petName, nameTypes }) => ({
	nameType: nameTypes.find(nt => nt.name === petName),
});
const callTypeApi = ({ getType, petName }) => {
	getType(petName);
};

const callTypeInProgress = ({ typeInProgress }) => !!typeInProgress;

const callTypeApiNeeded = ({ nameType }) => !nameType || !isValidCache(nameType);

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withProps(extraProps),
	withInit(callTypeApi, callTypeApiNeeded, callTypeInProgress, TopSpinner),
)(ShowDetailsBody);
