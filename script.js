"use strict";

// ///////////////
// 41. Simple prime streaming
/* 
Consider a sequence made up of the consecutive prime numbers. This infinite sequence would start with:

"2357111317192329313741434753596167717379..."
You will be given two numbers: a and b, and your task will be to return b elements starting from index a in this sequence.

For example:
solve(10,5) == `19232` Because these are 5 elements from index 10 in the sequence.
Tests go up to about index 20000.

More examples in test cases. Good luck!
*/

function solve(index, numEl) {
    const arrPrimes = [2];
    let i = 2;
    let strPrimes = i + "";

    while (index + numEl >= strPrimes.length) {
        if (arrPrimes.every((el) => i % el !== 0)) {
            arrPrimes.push(i);
            strPrimes += i;
        }

        i++;
    }

    return strPrimes.slice(index, index + numEl);
}

// console.log(solve(10, 5)); // "19232"

////////////////////////////////////////
// 42. Where my anagrams at?
/* 
What is an anagram? Well, two words are anagrams of each other if they both contain the same letters. For example:

'abba' & 'baab' == true

'abba' & 'bbaa' == true

'abba' & 'abbba' == false

'abba' & 'abca' == false
Write a function that will find all the anagrams of a word from a list. You will be given two inputs a word and an array with words. You should return an array of all the anagrams or an empty array if there are none. For example:

anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) => ['aabb', 'bbaa']

anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) => ['carer', 'racer']

anagrams('laser', ['lazing', 'lazy',  'lacer']) => []
*/

function anagrams(str, arr) {
    const lookup = {};
    const match = [];
    for (let char of str) {
        lookup[char] = (lookup[char] || 0) + 1;
    }

    mainloop: for (let word of arr) {
        if (word.length !== str.length) continue;
        const lookupCopy = { ...lookup };

        for (let char of word) {
            if (!lookupCopy[char]) continue mainloop;
            lookupCopy[char] -= 1;
        }

        match.push(word);
    }

    return match;
}

// console.log(anagrams("abba", ["aabb", "abcd", "bbaa", "dada"]));
// console.log(anagrams("racer", ["crazer", "carer", "racar", "caers", "racer"]));
// console.log(anagrams("laser", ["lazing", "lazy", "lacer"]));

// 43. Convert HTML Entities - freecodecamp
/* 
Convert the characters &, <, >, " (double quote), and ' (apostrophe), in a string to their corresponding HTML entities.

********************************
convertHTML("Dolce & Gabbana") should return the string Dolce &amp; Gabbana.

convertHTML("Hamburgers < Pizza < Tacos") should return the string Hamburgers &lt; Pizza &lt; Tacos.

convertHTML("Sixty > twelve") should return the string Sixty &gt; twelve.

convertHTML('Stuff in "quotation marks"') should return the string Stuff in &quot;quotation marks&quot;.

convertHTML("Schindler's List") should return the string Schindler&apos;s List.

convertHTML("<>") should return the string &lt;&gt;.

convertHTML("abc") should return the string abc.
 */
function convertHTML(str) {
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
}

console.log(convertHTML("Dolce & Gabbana"));

// 44. Sum All Odd Fibonacci Numbers - freecodecamp
/* 
Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.

The first two numbers in the Fibonacci sequence are 1 and 1. Every additional number in the sequence is the sum of the two previous numbers. The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.

For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than or equal to 10 are 1, 1, 3, and 5.
************************************
sumFibs(1) should return a number.

sumFibs(1000) should return 1785.

sumFibs(4000000) should return 4613732.

sumFibs(4) should return 5.

sumFibs(75024) should return 60696.

sumFibs(75025) should return 135721.
 */

function sumFibs(num) {
    const fibsArr = [0, 1];
    let fibNum = 1;
    let i = 2;

    while (fibNum <= num) {
        fibNum = fibsArr[i - 1] + fibsArr[i - 2];
        if (fibNum <= num) fibsArr[i] = fibNum;
        i++;
    }
    // console.log(fibsArr);
    return fibsArr.filter((el) => el % 2 === 1).reduce((sum, cur) => sum + cur);
}

console.log(sumFibs(75025));

// 45. Sum All Primes - freecodecamp
/* 
A prime number is a whole number greater than 1 with exactly two divisors: 1 and itself. For example, 2 is a prime number because it is only divisible by 1 and 2. In contrast, 4 is not prime since it is divisible by 1, 2 and 4.

Rewrite sumPrimes so it returns the sum of all prime numbers that are less than or equal to num.

********************************
sumPrimes(10) should return a number.

sumPrimes(10) should return 17.

sumPrimes(977) should return 73156.
 */

function sumPrimes(num) {
    const arrPrimes = [2];
    let i = 2;
    while (i <= num) {
        if (arrPrimes.every((el) => i % el !== 0)) arrPrimes.push(i);

        i++;
    }

    return arrPrimes.reduce((acc, cur) => acc + cur);
}

console.log(sumPrimes(2));

// 46. Smallest Common Multiple - freecodecamp
/* 
Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.

The range will be an array of two numbers that will not necessarily be in numerical order.

For example, if given 1 and 3, find the smallest common multiple of both 1 and 3 that is also evenly divisible by all numbers between 1 and 3. The answer here would be 6.

********************************************************************
smallestCommons([1, 5]) should return a number.

smallestCommons([1, 5]) should return 60.

smallestCommons([5, 1]) should return 60.

smallestCommons([2, 10]) should return 2520.

smallestCommons([1, 13]) should return 360360.

smallestCommons([23, 18]) should return 6056820.
 */
// Version that does not pass all the tests
function smallestCommons(arr, product = 1) {
    arr.sort((a, b) => a - b);
    const [a, b] = arr;
    if (a === b) return product;
    console.log(a, b, product);
    if (product % b !== 0) product *= b;
    return smallestCommons([a, b - 1], product);
}

// Version that does not pass all the tests
function smallestCommons2(arr, product = 1) {
    arr.sort((a, b) => a - b);
    const [a, b] = arr;
    if (a === b) return product;
    console.log(a, b, product);
    if (product % a !== 0) product *= a;
    return smallestCommons2([a + 1, b], product);
}

// Brute force
function smallestCommons3(arr) {
    arr.sort((a, b) => a - b);
    const [a, b] = arr;
    const arrNums = [];
    for (let i = 0; i <= b - a; i++) {
        arrNums[i] = a + i;
    }
    let product = 1;
    while (!arrNums.every((el) => product % el === 0)) {
        product += 1;
    }
    return product;
}

// Best answer
function smallestCommons4(arr) {
    arr.sort((a, b) => a - b);
    const [a, b] = arr;
    const arrNums = [];
    for (let i = 0; i <= b - a; i++) {
        arrNums[i] = a + i;
    }
    const upperLimit = arrNums.reduce((acc, el) => acc * el);

    for (let product = b; product <= upperLimit; product += b) {
        if (arrNums.every((el) => product % el === 0)) return product;
    }
}

console.log(smallestCommons4([1, 5]));

// 47. Drop it - freecodecamp
/* 
Given the array arr, iterate through and remove each element starting from the first element (the 0 index) until the function func returns true when the iterated element is passed through it.

Then return the rest of the array once the condition is satisfied, otherwise, arr should be returned as an empty array.

****************************************************
dropElements([1, 2, 3, 4], function(n) {return n >= 3;}) should return [3, 4].

dropElements([0, 1, 0, 1], function(n) {return n === 1;}) should return [1, 0, 1].

dropElements([1, 2, 3], function(n) {return n > 0;}) should return [1, 2, 3].

dropElements([1, 2, 3, 4], function(n) {return n > 5;}) should return [].

dropElements([1, 2, 3, 7, 4], function(n) {return n > 3;}) should return [7, 4].

dropElements([1, 2, 3, 9, 2], function(n) {return n > 2;}) should return [3, 9, 2].
 */
function dropElements(arr, func) {
    while (!func(arr[0]) && arr.length > 0) {
        arr.shift();
    }
    return arr;
}
console.log(
    dropElements([1, 2, 3, 4], function (n) {
        return n >= 5;
    })
);

/* 48. Steamroller - freecodecamp

Flatten a nested array. You must account for varying levels of nesting.
steamrollArray([[["a"]], [["b"]]]) should return ["a", "b"].

steamrollArray([1, [2], [3, [[4]]]]) should return [1, 2, 3, 4].

steamrollArray([1, [], [3, [[4]]]]) should return [1, 3, 4].

steamrollArray([1, {}, [3, [[4]]]]) should return [1, {}, 3, 4].

Your solution should not use the Array.prototype.flat() or Array.prototype.flatMap() methods. 

*/

function steamrollArray2(arr) {
    if (!arr.some((el) => Array.isArray(el))) return arr;
    const flat1 = arr.reduce((acc, cur) => {
        if (Array.isArray(cur)) acc.push(...cur);
        else acc.push(cur);
        return acc;
    }, []);
    return steamrollArray2(flat1);
}

console.log(steamrollArray2([1, [2], [], [3, [[4]]]]));
console.log([1, [2], [], [3, [[4]]]].some((el) => Array.isArray(el)));

// 49. DNA Pairing - freecodecamp
/* 
The DNA strand is missing the pairing element. Take each character, get its pair, and return the results as a 2d array.

Base pairs are a pair of AT and CG. Match the missing element to the provided character.

Return the provided character as the first element in each array.

For example, for the input GCG, return [["G", "C"], ["C","G"], ["G", "C"]]

The character and its pair are paired up in an array, and all the arrays are grouped into one encapsulating array. */

/* pairElement("ATCGA") should return [["A","T"],["T","A"],["C","G"],["G","C"],["A","T"]].

pairElement("TTGAG") should return [["T","A"],["T","A"],["G","C"],["A","T"],["G","C"]].

pairElement("CTCTA") should return [["C","G"],["T","A"],["C","G"],["T","A"],["A","T"]]. */

function pairElement(str) {
    const pairs = {
        A: "T",
        T: "A",
        C: "G",
        G: "C",
    };
    return str.split("").map((el) => [el, pairs[el]]);
}

console.log(pairElement("GCG"));
