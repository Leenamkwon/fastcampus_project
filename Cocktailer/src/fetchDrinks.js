import * as loading from './toggleLoading.js';

const fetchDrinks = async (url) => {
  try {
    loading.showLoading();
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchDrinks;

// models
