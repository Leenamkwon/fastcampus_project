function longestWords(str) {
  let words = str.split(' ');
  let size = 0;
  let max = [''];

  for (let i = 0; i < words.length; i++) {
    // words 각 배열값을 size와 비교해서 큰 것만을 size에 재할당 반복
    if (words[i].length >= size) {
      size = words[i].length;
      if (max[max.length - 1].length < words[i].length) {
        max = [];
        max.push(words[i]);
      } else {
        max = [...max, words[i]];
      }
    }
  }

  return `이 문장에서 제일 긴 단어 수는 ${size} | 단어는 ${[...max]}`;
}

console.log(longestWords('john react apple china ps5 ipad'));
