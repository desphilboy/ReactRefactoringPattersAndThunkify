import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { resolveInfo } from '../../../redux/effects/info.js';
import { override } from '../styles.js';
import withInit from '../../higher-order/with-init';
import withProps from '../../higher-order/with-props';
import { isValidCache } from '../../../redux/helpers.js';

const BottomSpinner = () => (
	<div className="sweet-loading">
		<ClipLoader css={override} size={150} color="#123abc" loading />
	</div>
);

const ShowInfoView = ({ info: { len, width, height, weight, eats, legs_hands, description } }) => (
	<div>
		<p>
			dimensions: L:{len} W:{width} H:{height}
		</p>
		<p>eats: {(eats || []).join(',')}</p>
		<p>body shape: has {legs_hands} hands and legs</p>
		<p>
			Weight {weight && weight.min} to {weight && weight.max} Kgs.
		</p>
		<p>{description}</p>
	</div>
);

const findTypeInfo = (info, petType) => info.find(inf => inf.petType === petType);
const animalsInfoSelector = state => state.info.animals;
const iipSelector = state => state.info.inProgress;

const mapStateToProps = state => ({
	infoInProgress: iipSelector(state),
	animals: animalsInfoSelector(state),
});

const mapDispatchToProps = dispatch => ({
	getInfo: type => dispatch(resolveInfo(type)),
});

const extraProps = ({ animals, petType }) => ({
	info: findTypeInfo(animals, petType),
});

const callInfoApi = ({ getInfo, petType }) => {
	getInfo(petType);
};

const callInfoInProgress = ({ infoInProgress }) => infoInProgress;

const callInfoNeeded = ({ info }) => !isValidCache(info);

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withProps(extraProps),
	withInit(callInfoApi, callInfoNeeded, callInfoInProgress, BottomSpinner),
)(ShowInfoView);
