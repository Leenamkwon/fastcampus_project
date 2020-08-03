// UTILITY
const debounce = (callback, delay) => {
  let timeoutId;
  return (argument) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      callback(argument);
    }, delay);
  };
};
