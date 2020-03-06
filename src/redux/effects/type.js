import axios from 'axios';
import { lookupStart, lookupSuccess, lookupError } from '../reducers/look-up.reducer.js';
import { setPetType } from '../reducers/pageInfo.reducer.js';
import { isValidCache } from '../helpers.js';

export const resolveType = name =>
  async function(dispatch, getState) {
    dispatch(lookupStart(name));

    const {
      lookUp: { nameTypes },
    } = getState();
    console.log('nameTypes>>>>>>>>', nameTypes);
    const cachedResult = nameTypes.find(nt => nt.name === name);

    if (isValidCache(cachedResult)) {
      dispatch(setPetType(cachedResult.petType));
      dispatch(lookupSuccess(cachedResult));
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3010/type/${name}`);
      console.log('111111111111111');
      console.log('type response >>>>>>>>>>>>>.', response);
      dispatch(setPetType(response.data.type));
      dispatch(lookupSuccess(response.data));
    } catch (err) {
      console.log(err);
      dispatch(lookupError(err));
    }
  };
