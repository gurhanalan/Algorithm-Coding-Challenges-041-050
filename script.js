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
