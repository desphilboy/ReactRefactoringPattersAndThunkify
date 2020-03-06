import axios from 'axios';
import { lookupStart, lookupSuccess, lookupError } from '../reducers/look-up.reducer.js';
import { setPetType } from '../reducers/pageInfo.reducer.js';
import { isValidCache } from '../helpers.js';
import thunkify from '../thunkification';

const fetchType = async ({
  petName,
  lookupError,
  lookupSuccess,
  lookupStart,
  setPetType,
  isValidCache,
  cachedResult,
}) => {
  lookupStart(petName);
  if (isValidCache(cachedResult(petName))) {
    setPetType(cachedResult(petName).petType);
    lookupSuccess(cachedResult(petName));
    return;
  }

  try {
    const response = await axios.get(`http://localhost:3010/type/${petName}`);
    setPetType(response.data.type);
    lookupSuccess(response.data);
  } catch (err) {
    console.log(err);
    lookupError(err);
  }
};

const typeMap = (dispatch, getState) => ({
  lookupError: error => dispatch(lookupError(error)),
  lookupStart: name => dispatch(lookupStart(name)),
  lookupSuccess: res => dispatch(lookupSuccess(res)),
  setPetType: petType => dispatch(setPetType(petType)),
  cachedResult: name => {
    const {
      lookUp: { nameTypes },
    } = getState();
    return nameTypes.find(nt => nt.name === name);
  },
  isValidCache,
});

export const resolveType = thunkify(typeMap)(fetchType);
