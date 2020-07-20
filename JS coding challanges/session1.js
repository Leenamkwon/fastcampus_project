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
	// My solution 2
	// const tempSplit = str.split('');
	// tempSplit.reverse();
	// return tempSplit.join('');
	// My solution 3
	// let reverseVOCA = '';
	// for (let char of str) {
	//   reverseVOCA = char + reverseVOCA;
	// }
	// console.log(reverseVOCA);
	// My solution 4
	// let reverseVOCA = '';
	// str.split('').forEach((char) => {
	//   reverseVOCA = char + reverseVOCA;
	// });
	// return reverseVOCA;
	// instructor solution
	// Instructor solution
	// return str.split('').reduce((rev, char) => {
	//  return char + rev
	// }, '');
}

// CHALLENGE 2: VALIDATE A PALINDROME
// Return true if palindrome and false if not
// ex. isPalindrome('racecar') === 'true', isPalindrome('hello') == false

function isPalindrome(str) {
	const revString = str.split('').reverse().join('');

	return revString === str;
}

// CHALLENGE 3: REVERSE AN INTEGER
// Return an integer in reverse
// ex. reverseInt(521) === 125

function reverseInt(int) {
	// My solution 1
	// const reverse = int.toString().split('');
	// const num = +reverse.reverse().join('');
	// My solution 2
}

// CHALLENGE 4: CAPITALIZE LETTERS
// Return a string with the first letter of every word capitalized
// ex. capitalizeLetters('i love javascript') === 'I Love Javascript'
function capitalizeLetters(str) {}

// CHALLENGE 5: MAX CHARACTER
// Return the character that is most common in a string
// ex. maxCharacter('javascript') == 'a'
function maxCharacter(str) {}

// CHALLENGE 6: FIZZBUZZ
// Write a program that prints all the numbers from 1 to 100. For multiples of 3, instead of the number, print "Fizz", for multiples of 5 print "Buzz". For numbers which are multiples of both 3 and 5, print "FizzBuzz".
function fizzBuzz() {}

// Call Function
const output = reverseInt(521);

console.log(output);
