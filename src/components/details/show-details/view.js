import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ClockLoader } from 'react-spinners';
import { override } from '../styles.js';
import InfoComponent from '../show-info';

export const TopSpinner = () => (
	<div className="sweet-loading">
		<ClockLoader css={override} size={150} color="#123abc" loading />
	</div>
);

export const ShowDetailsBody = ({ petName, nameType: { petType } = {} }) => (
	<div>
		<h2>
			{petName} is a {petType}
		</h2>
		<InfoComponent petType={petType} />
	</div>
);
