import {API_BASE, API_VERSION} from '@env';
import {logger} from './logger';

const fetchWrapper = async (relPath: string) => {
  const ENDPOINT = `${API_BASE}/${relPath}`;
  const options = {
    method: 'GET',
    headers: [],
  };
  console.log(ENDPOINT);
  try {
    const response = await fetch(ENDPOINT, options);
    return response;
  } catch (error) {
    logger(`error in ${API_BASE} ${API_VERSION} ${error}`);
  }
};

export default fetchWrapper;
