const fetchData = async (searchTerm) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '11ac11dc',
      s: searchTerm,
    },
  });

  console.log(response.data);
};

const input = document.querySelector('.input');

const debounce = (func) => {
  let timeoutId;
  return (asd) => {
    console.log(asd);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(asd);
    }, 1000);
  };
};

const onInput = debounce((event) => {
  fetchData(event.target.value);
});

input.addEventListener('input', onInput);
