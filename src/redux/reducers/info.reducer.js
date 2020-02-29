import { createActions, combineActions, handleActions } from 'redux-actions';
import moment from 'moment-timezone';

const INFO_START = 'INFO_START';
const INFO_SUCCESS = 'INFO_SUCCESS';
const INFO_ERROR = 'INFO_ERROR';

export const { infoStart, infoSuccess, infoError } = createActions({
  INFO_START: (type) => ({
    inProgress: true, error: false, data: false, petType: type,
  }),
  INFO_SUCCESS: (data) => ({ inProgress: false, error: false, data }),
  INFO_ERROR: (error) => ({ inProgress: false, error, data: false }),
});

export const info = handleActions(
  {
    [combineActions(infoStart, infoError)]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [INFO_SUCCESS]: (state, action) => ({
    	...state,
      ...action.payload,
    	animals: [{
        petType: state.petType,
    		...action.payload.data.info,
    		lastUpdate: moment(),
    	}].concat(state.animals.filter((animal) => animal.petType !== state.petType)),
    }),
  },
  {
    inProgress: false, error: false, data: false, animals: [],
  },
);
