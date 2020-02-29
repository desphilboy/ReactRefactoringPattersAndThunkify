import { createActions, combineActions, handleActions } from 'redux-actions';
import moment from 'moment-timezone';

const LOOKUP_START = 'LOOKUP_START';
const LOOKUP_SUCCESS = 'LOOKUP_SUCCESS';
const LOOKUP_ERROR = 'LOOKUP_ERROR';

export const { lookupStart, lookupSuccess, lookupError } = createActions({
  LOOKUP_START: (name) => ({
    inProgress: true, error: false, data: false, name,
  }),
  LOOKUP_SUCCESS: (data) => ({ inProgress: false, error: false, data }),
  LOOKUP_ERROR: (error) => ({ inProgress: false, error, data: false }),
});

export const lookUp = handleActions(
  {
    [combineActions(lookupStart, lookupError)]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LOOKUP_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
      nameTypes: [{ name: state.name, petType: action.payload.data.type, lastUpdate: moment() }]
        .concat(state.nameTypes.filter((nt) => nt.name !== state.name)),
    }),
  },
  {
    inProgress: false, error: false, data: false, nameTypes: [],
  },
);
