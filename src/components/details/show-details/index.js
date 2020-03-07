import { compose } from 'redux';
import { connect } from 'react-redux';
import withInit from '../../higher-order/with-init';
import withProps from '../../higher-order/with-props';
import {
	mapStateToProps,
	mapDispatchToProps,
	extraProps,
	callTypeApi,
	callTypeApiNeeded,
	callTypeInProgress,
} from './logic.js';
import { ShowDetailsBody, TopSpinner } from './view';

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withProps(extraProps),
	withInit(callTypeApi, callTypeApiNeeded, callTypeInProgress, TopSpinner),
)(ShowDetailsBody);
