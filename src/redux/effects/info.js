import axios from 'axios';
import { infoStart, infoSuccess, infoError } from '../reducers/info.reducer.js';
import { isValidCache } from '../helpers.js';

export const resolveInfo = (type) => async function (dispatch, getState) {
  dispatch(infoStart(type));

  const { info: { animals } } = getState();
  console.log('animals >>>>>>',animals);
  const cachedResult = animals.find(animal => animal.petType === type);

  console.log('cached result>>>>>', cachedResult);

  if(isValidCache(cachedResult)) {
    setTimeout(() => {
      dispatch(infoSuccess({ info: cachedResult }));
    }, 100);
    return;
  }

  try {
    console.log('type>>>>', type);
    const response = await axios.get(`http://localhost:3010/info/${type}`);
    console.log(response);
    dispatch(infoSuccess(response.data));
  } catch (err) {
    console.log(err);
    dispatch(infoError(err));
  }
};
