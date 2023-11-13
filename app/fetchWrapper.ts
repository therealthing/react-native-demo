import {API_BASE, API_VERSION} from '@env';
import {logger} from './logger';

const fetchWrapper = async (
  relPath: string,
  method: 'GET' | 'PUT' | 'DELETE' | 'POST' = 'GET',
  data: {} | null,
) => {
  const ENDPOINT = `${API_BASE}/${relPath}`;
  let body = method === 'PUT' && data ? JSON.stringify(data) : undefined;

  const options = {
    method,
    headers: {'Content-Type': 'application/json'},
    body,
  };

  try {
    const response = await fetch(ENDPOINT, options);
    return response;
  } catch (error) {
    logger(`error in ${API_BASE} ${API_VERSION} ${error}`);
  }
};

export default fetchWrapper;
