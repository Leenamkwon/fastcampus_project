function unique(str) {
  let values = [];

  for (let letter of str) {
    // 1. find index
    if (values.indexOf(letter) !== -1) {
      continue; // or 'return false'
    }
    values.push(letter);

    // 2. find str
    if (values.includes(letter)) {
      continue;
    } else {
      values.push(letter);
    }

    // whatever you choice
  }

  console.log(values.join(' ') + ' ' + 'is unique');
  return str;
}

function unique2(str) {
  let values = {};

  for (let letter of str) {
    if (values[letter]) {
      continue;
    }
    values[letter] = 'exsist';
  }

  return str;
}

function unique3(str) {
  for (let i = 0; i < str.length; i++) {
    if (str.lastIndexOf(str[i]) !== i) {
      continue;
    }
  }
  return true;
}

console.log(unique('abcde'));
console.log(unique('aabacdefbbcde'));

console.log(unique2('aabacdefbbcde'));

console.log(unique3('aabacdefbbcde'));
