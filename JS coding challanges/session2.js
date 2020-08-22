// CHALLENGE 1: LONGEST WORD
// Return the longest word of a string
// ex. longestWord('Hi there, my name is Brad') === 'there,'

function longestWord(sen) {
  // SOLUTION 1 - Return a single longest word
  const wordArr = sen.toLowerCase().match(/[a-z0-9]+/g);

  // Sort by length
  const sorted = [...wordArr].sort((a, b) => {
    return b.length - a.length;
  });

  // SOLUTION 2 - Return an array and include multiple words if they have the same length
  const longerstWordArr = sorted.filter((word) => {
    return word.length === sorted[0].length;
  });

  // SOLUTION 3 - Only return an array if multiple words, otherwise return a string
  // Check if more than one array val
  if (longerstWordArr.length === 1) {
    return longerstWordArr[0];
  } else {
    return longerstWordArr;
  }
}

// CHALLENGE 2: ARRAY CHUNKING
// Split an array into chunked arrays of a specific length
// ex. chunkArray([1, 2, 3, 4, 5, 6, 7], 3) === [[1, 2, 3],[4, 5, 6],[7]]
// ex. chunkArray([1, 2, 3, 4, 5, 6, 7], 2) === [[1, 2],[3, 4],[5, 6],[7]]

function chunkArray(arr, len) {
  const chunkedArr = [];
  let i = 0;

  // SOLUTION 1
  while (i < arr.length) {
    chunkedArr.push(arr.slice(i, i + len));
    i += len;
  }

  // SOLUTION 2
  for (let i = 0; i < arr.length; i += len) {
    chunkedArr.push(arr.slice(i, i + len));
  }
}

// CHALLENGE 3: FLATTEN ARRAY
// Take an array of arrays and flatten to a single array
// ex. [[1, 2], [3, 4], [5, 6], [7]] = [1, 2, 3, 4, 5, 6, 7]

function flattenArray(arrays) {
  // SOLUTION 1
  let flatten = [];
  // arrays.forEach((deep) => flatten.push(...deep));
  // return flatten;

  // SOLUTION 2
  // return arrays.reduce((a, b) => {
  //   return a.concat(b);
  // }, []);

  // SOLUTION 3
  // return Array.prototype.concat.apply(flatten, arrays);
}

// CHALLENGE 4: ANAGRAM
// Return true if anagram and false if not
// ex. 'elbow' === 'below'
// ex. 'Dormitory' === 'dirty room##'

function isAnagram(str1, str2) {}

// CHALLENGE 5: LETTER CHANGES
// Change every letter of the string to the one that follows it and capitalize the vowels
// Z should turn to A
// ex. 'hello there' === 'Ifmmp UIfsf'

function letterChanges(str) {}

// Call Function
const output = flattenArray([[1, 2], [3, 4], [5, 6], [7]]);

console.log(output);
