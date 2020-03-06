import axios from 'axios';
import { infoStart, infoSuccess, infoError } from '../reducers/info.reducer.js';
import { isValidCache } from '../helpers.js';
import thunkify from '../thunkification';

const fetchInfo = async ({ infoStart, infoError, infoSuccess, cachedResult, isValidCache, petType }) => {
  infoStart(petType);
  if (isValidCache(cachedResult(petType))) {
    infoSuccess({ info: cachedResult(petType) });
    return;
  }
  try {
    const response = await axios.get(`http://localhost:3010/info/${petType}`);
    infoSuccess(response.data);
  } catch (err) {
    console.log(err);
    infoError(err);
  }
};

const infoMap = (dispatch, getState) => ({
  infoStart: type => dispatch(infoStart(type)),
  infoError: err => dispatch(infoError(error)),
  infoSuccess: res => dispatch(infoSuccess(res)),
  cachedResult: type => {
    const {
      info: { animals },
    } = getState();
    const cachedResult = animals.find(animal => animal.petType === type);
    return cachedResult;
  },
  isValidCache,
});

export const resolveInfo = thunkify(infoMap)(fetchInfo);
