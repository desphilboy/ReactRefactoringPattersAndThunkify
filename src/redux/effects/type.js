import axios from 'axios';
import { lookupStart, lookupSuccess, lookupError } from '../reducers/look-up.reducer.js';
import { setPetType } from '../reducers/pageInfo.reducer.js';
import { isValidCache } from '../helpers.js';


export const resolveType = (name) => async function (dispatch, getState) {
  	dispatch(lookupStart(name));

    const { lookUp: { nameTypes } } = getState();
    console.log('nameTypes>>>>>>>>', nameTypes);
    const cachedResult = nameTypes.find(nt => nt.name === name);

    if(isValidCache(cachedResult)) {
      setTimeout(() => {
        dispatch(lookupSuccess(cachedResult));
        dispatch(setPetType(cachedResult.petType));
      }, 100);
      return;
    }

  	try {
  		const response = await axios.get(`http://localhost:3010/type/${name}`);
  		console.log(response);
  		dispatch(lookupSuccess(response.data));
      dispatch(setPetType(response.data.type));
  	} catch (err) {
  		console.log(err);
  		dispatch(lookupError(err));
  	}
};
