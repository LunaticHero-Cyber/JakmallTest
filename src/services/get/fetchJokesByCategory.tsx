import axios from 'axios';

import {JokeInterface} from 'appTypes/joke.type';
import {HOST_JOKE_URL} from 'constants/api';

export const fetchJokesByCategory = async (
  category: string,
  amount?: number,
  type?: string,
): Promise<Array<JokeInterface>> => {
  try {
    const response = await axios.get(
      `${HOST_JOKE_URL}/${category}?type=${type ?? 'single'}&amount=${
        amount ?? 2
      }`,
    );
    return response.data?.jokes;
  } catch (err) {
    throw err;
  }
};
