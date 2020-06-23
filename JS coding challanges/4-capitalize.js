function capitalize(str) {
  let words = str
    .split(' ')
    .map((item) => {
      return item.charAt(0).toUpperCase() + item.slice(1);
    })
    .join(' ');
  console.log(words);
}

capitalize('i want to go city');
