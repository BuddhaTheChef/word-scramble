function scramble(string1, string2) {
  //Inital setup
  string1 = string1.toUpperCase();
  string2 = string2.toUpperCase();
  let reversed = string1.split("").reverse().join("");    

  //ranking for NOT
  //checking if the strings match
  if (string1 === string2) {
    return `${string1} is not a scramble for ${string2}`;
  }

  //ranking for POOR
  //if duplicate is 2 that means there are at least two characters consecutivly at the same index and charAt(0) checks to see if the first letter in each word is the same
  if (duplicate(string1, string2) === 2 && checker(string1) === false || string1.charAt(0) === string2.charAt(0) && checker(string1) === false ) {
    return `${string1} is a poor scramble for ${string2}`;
  }

  //ranking for HARD
  //checks to see if any of the characters alternate between vowels and consonants // if there are no continuous characters // string1 reveversed doesnt equal string2
  if (checker(string1) === true && duplicate(string1,string2) === 0 && reversed !== string2) {
    return `${string1} is a hard scramble for ${string2}`;
  }

  //ranking for FAIR (all other cases)
  //checks to see if the reversed string 1 is equal to string2 and if there is no duplicates but 1
  if (duplicate(string1, string2) === 1 || reversed === string2  || string1.length !== string2.length ||checker(string1) === true) {
    return `${string1} is a fair scramble for ${string2}`;
  } 
    return `${string1} is a fair scramble for ${string2}`;
}


//HELPER FUNCTION FOR CONSECUTIVE MATCHES 
function duplicate(string1, string2) {
    //takes strings and makes the characters into arrays
    const stringSplit1 = string1.split('')
    const stringSplit2 = string2.split('')
    //initializing count
    let count = 0;
    //allows for one for loop and Math.min makes it so you dont go pass the length orf arrays
    const length = Math.min(stringSplit1.length,stringSplit2.length);
    for(let i=0; i<length; i++){
    //if char on str1 is same index as char on str2 then increment
      if(stringSplit1[i] == stringSplit2[i]) {
        count++;
        if(count === 1 && stringSplit1[i + 1] == stringSplit2[i + 1]) {
            count+1;
        }
        else {
            break;
        }
    }   
    //when looping if indexas value is not the same leave count the same
      else if(stringSplit2.indexOf(stringSplit1[i]) >= 0)
        count;
    }
    return count;
}


//HELPER FUNCTION FOR ALTERNATING CONSTANTS AND VOWELS
function checker(string1) {
 //initializing vowels to check
  let sliced1 = string1.split('');
  const vowels = "AEIOUY";
  const vowel = ['A', 'E', 'I', 'O', 'U'];
  const consonants = ['B','C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T','V', 'W', 'X', 'Z'];
  const doubleConsonants = ['AI', 'AY', 'EA', 'EE', 'EO', 'IO', 'OA','OO', 'OY', 'YO', 'YU', 'BL',' BR', 'CH', 'CK',
  'CL', 'CR', 'DR', 'FL', 'FR', 'GH', 'GL', 'GR', 'KL', 'KR', 'KW', 'PF', 'PL', 'PR' , 'SC', 'SCH',	
  'SCR', 'SH', 'SHR', 'SK', 'SL', 'SM', 'SN', 'SP', 'SQ', 'ST', 'SW', 'TH', 'THR', 'TR', 'TW', 'WH', 'WR'];

 for(let i = 0; i < doubleConsonants.length; i++ ){
     let arr1 = vowel.filter(char => char === string1[0]);
     let arr2 = doubleConsonants.filter(char => char === string1[1] + string1[2]);
    if(arr1 + arr2 === string1.slice(0,3) ) {
        return false;
    }
     else if(string1.includes(doubleConsonants[i])) {
         return true;
     }
 }
 //checks word for consonants
  function isConsonant(word) {
    if (word.length <= 0) {
      return true;
    }
    if (vowels.indexOf(word[0]) === -1) {
     // returns sliced off char before 1st index
      return isVowel(word.slice(1));
    } else {
      return false;
    }
  }
 //checks word for vowels
  function isVowel(word) {
    if (word.length <= 0) {
      return true;
    }
    if (vowels.indexOf(word[0]) !== -1) {
     // returns sliced off char before 1st index
      return isConsonant(word.slice(1));
    } else {
      return false;
    }
  }
 //slice string into groups vowels and consonants
  if (vowels.indexOf(string1[0]) === -1) {
    return isVowel(string1.slice(1));
  } else {
    return isConsonant(string1.slice(1));
  }
}

console.log(scramble("MAPS", "SPAM")); //fair
console.log(scramble("RIONY", "IRONY")); //fair
console.log(scramble("ONYRI", "IRONY")); //hard
console.log(scramble("IRONY", "IRONY")); //not
console.log(scramble("INOYR", "IRONY")); //fair
console.log(scramble("IOYRN", "IRONY")); //poor

console.log('--------More Test Cases --------')

console.log(scramble("MAPS", "MAPS")); //not
console.log(scramble("SAPM", "MAPS")); //poor
console.log(scramble("LOOC", "COOL")); //fair
console.log(scramble("LOCO", "COOL")); //fair
console.log(scramble("COOL", "OCLO")); //hard
console.log(scramble("maps", "sPaM")); //fair
console.log(scramble("NIRA", "RAIN")); //hard 
console.log(scramble("NRIAM","RAINM")); //fair
console.log(scramble("coMpAs", "COMPAS")); //not
