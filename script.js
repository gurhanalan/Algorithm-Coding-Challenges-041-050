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
// Where my anagrams at?
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
