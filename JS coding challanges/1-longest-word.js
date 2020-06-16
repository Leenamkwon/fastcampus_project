function longestWord(str) {
  let words = str.split(' ');
  let longestWord = '';

  for (let word of words) {
    word.length > longestWord.length ? (longestWord = word) : false;
  }
  return longestWord;
}

longestWord('i wake up early'); // early
longestWord('my name is namkwon, my job is developer'); // developer
