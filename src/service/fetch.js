import fetch from 'cross-fetch';

const BASE_URL = 'https://blog-post-hazel-one.vercel.app/';

export const userRequest = async (options, endpoint) => {
  try {
    const url = `${BASE_URL}user/${endpoint}`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error making user request:', error);
    return { error: 'An error occurred while making the request.' };
  }
};

export const postRequest = async (options, endpoint) => {
  try {
    const url = `${BASE_URL}post/${endpoint}`;
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error making post request:', error);
    return { error: 'An error occurred while making the request.' };
  }
};
