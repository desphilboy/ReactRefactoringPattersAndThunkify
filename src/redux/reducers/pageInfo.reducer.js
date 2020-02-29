import { createActions, combineActions, handleActions } from 'redux-actions';
import moment from 'moment-timezone';

const SET_PET_NAME = 'SET_PET_NAME';
const SET_PET_TYPE = 'INFO_SUCCESS';


export const { setPetName, setPetType } = createActions({
  SET_PET_TYPE: (type) => ({ petType: type }),
  SET_PET_NAME: (name) => ({ petName: name }),
});

export const pageInfo = handleActions(
  {
    [combineActions(setPetType, setPetName)]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  { petName: '', petType: '' },
);
