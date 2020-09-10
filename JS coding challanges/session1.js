// CHALLENGE 1: REVERSE A STRING
// Return a string in reverse
// ex. reverseString('hello') === 'olleh'

function reverseString(str) {
  // My solution 1
  // const tempSplit = str.split('');
  // let reverseVOCA = '';
  //  for (let i = tempSplit.length - 1; i >= 0; i -= 1) {
  //    reverseVOCA += tempSplit[i];
  //  }
  //  return reverseVOCA;
  /////////////////////////
  // My solution 2
  // const tempSplit = str.split('');
  // tempSplit.reverse();
  // return tempSplit.join('');
  // My solution 3
  // let reverseVOCA = '';
  // for (let char of str) {
  //   reverseVOCA = char + reverseVOCA;
  // }
  // My solution 4
  // let reverseVOCA = '';
  // str.split('').forEach((char) => {
  //   reverseVOCA = char + reverseVOCA;
  // });
  // return reverseVOCA;
  /* instructor solution */
  // return str.split('').reduce((rev, char) => {
  // 	return char + rev;
  // }, '');
}

// CHALLENGE 2: VALIDATE A PALINDROME
// Return true if palindrome and false if not
// ex. isPalindrome('racecar') === 'true', isPalindrome('hello') == false

function isPalindrome(str) {
  /* My solution */
  // const revString = str.split('').reverse().join('');
  // return revString === str;
}

// CHALLENGE 3: REVERSE AN INTEGER
// Return an integer in reverse
// ex. reverseInt(521) === 125
// ex2. () -521 -> (-125 || 125) )

function reverseInt(int) {
  // My solution 1
  // const reverse = int.toString().split('');
  // const num = parseInt(reverse.reverse().join(''), 10);
  // return Math.abs(num);
  /*
   My solution 2
  if (int.toString().includes('-')) {
    const reverse = int.toString().split('');
    const arr = parseInt(reverse.slice(1).reverse().join(''));

    console.log(`${reverse[0]}${arr}`);
    return `${reverse[0]}${arr}`;
  } else {
    const reverse = parseInt(int.toString().split('').reverse().join(''));
    return reverse;
  } */
}

// CHALLENGE 4: CAPITALIZE LETTERS
// Return a string with the first letter of every word capitalized
// ex. capitalizeLetters('i love javascript') === 'I Love Javascript'
function capitalizeLetters(str) {
  /* My solution 1 */
  // const split = str.split(' ');
  // const parseSentence = split
  // 	.map((item) => {
  // 		const first = item[0].toUpperCase();
  // 		const sentence = `${first}${item.slice(1)}`;
  // 		return sentence;
  // 	})
  // 	.join(' ');
  // return parseSentence;
  /* My solution 2 */
  // const split = str.split(' ');
  // const parseSentence = split
  // 	.map((item) => {
  // 		return `${item[0].toUpperCase()}${item.slice(1)}`;
  // 	})
  // 	.join(' ');
  // return parseSentence;
  /* My solution 3 */
  // const split = str.split(' ');
  // const parseSentence = split.map((item) => {
  // 	return item.replace(item[0], item[0].toUpperCase());
  // });
  // const [i, love, javascript] = parseSentence;
  // return `${i} ${love} ${javascript}`;
  /* Instructor solution 1 */
  // const strArr = str.toLowerCase().split(' ');
  // for (let i = 0; i < strArr.length; i++) {
  // 	strArr[i] = strArr[i].slice(0, 1).toUpperCase() + strArr[i].slice(1);
  // }
  // return strArr.join(' ');
}

// CHALLENGE 5: MAX CHARACTER
// Return the character that is most common in a string
// ex. maxCharacter('javascript') == 'a'
function maxCharacter(str) {
  /* My solution 1 */
  const charMap = {};
  let maxNum = 0;
  let maxChar = '';
  str.split('').forEach((char) => {
    if (charMap[char]) {
      charMap[char]++;
    } else {
      charMap[char] = 1;
    }
  });
  for (let item in charMap) {
    if (charMap[item] > maxNum) {
      maxNum = charMap[item];
      maxChar = item;
    }
  }
  return maxChar;
}

// 3 1 1 5 1 1 1
//

// CHALLENGE 6: FIZZBUZZ
// Write a program that prints all the numbers from 1 to 100. For multiples of 3, instead of the number, print "Fizz", for multiples of 5 print "Buzz". For numbers which are multiples of both 3 and 5, print "FizzBuzz".
function fizzBuzz() {
  /* My solution */
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
      console.log('FizzBuzz');
    } else if (i % 3 === 0) {
      console.log('Fizz');
    } else if (i % 5 === 0) {
      console.log('Buzz');
    } else {
      console.log(i);
      continue;
    }
  }
}

// Call Function
const output = fizzBuzz();

console.log(output);
