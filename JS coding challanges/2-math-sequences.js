// not negative
function mathSequences(arr) {
  let arith = [];
  let geo = [];

  for (let i = 1; i < arr.length; i++) {
    let num1 = arr[i] - arr[i - 1];
    let num2 = arr[i] / arr[i - 1];
    arith = [...arith, num1];
    geo = [...geo, num2.toFixed(6)];
  }

  console.log(`arithMethic : ${arith}`);
  console.log(`geoMethic : ${geo}`);
}

mathSequences([2, 4, 6, 8]);
/*
arithMethic : 2,2,2
geoMethic : 2,1.5,1.3333333333333333
*/
mathSequences([3, 6, 9, 27]);
/*
arithMethic : 3, 3, 18
geoMethic : 2,1.5,3
*/
mathSequences([23, 32, 41, 56]);
/*
arithMethic : 9, 9, 15
geoMethic : 1.391304347826087,1.28125,1.3658536585365855
*/
