import axios from 'axios';

import {HOST_CATEGORY_URL} from 'constants/api';

export const fetchJokesCategory = async (): Promise<Array<string>> => {
  try {
    const response = await axios.get(HOST_CATEGORY_URL);
    return response.data?.categories;
  } catch (err) {
    throw err;
  }
};
