import { resolveType } from '../../../redux/effects/type.js';
import { isValidCache } from '../../../redux/helpers.js';

const nameTypesSelector = state => state.lookUp.nameTypes;
const tipSelector = state => state.lookUp.inProgress;

export const mapStateToProps = state => ({
	nameTypes: nameTypesSelector(state),
	typeInProgress: tipSelector(state),
});

export const mapDispatchToProps = dispatch => ({
	getType: petName => dispatch(resolveType({ petName })),
});

export const extraProps = ({ petName, nameTypes }) => ({
	nameType: nameTypes.find(nt => nt.name === petName),
});

export const callTypeApi = ({ getType, petName }) => {
	getType(petName);
};

export const callTypeInProgress = ({ typeInProgress }) => !!typeInProgress;

export const callTypeApiNeeded = ({ nameType }) => !nameType || !isValidCache(nameType);
