var wordlistEl = document.querySelector("#word-list"); //selects the <section> element on favorites.html
var wordsArr = []; // ? an array to hold the words(that are also the keys to the translation values)..

//**function to create the divs with words and tranlations /append to page
var createFavs = function () {
  wordsArr = JSON.parse(localStorage.getItem("array")); //get complete local storage array
  console.log(wordsArr);
  //for loop to loop through array in storage to get keys(words) and translations
  for (i = 0; i < wordsArr.length; i++) {
    var wordDiv = document.createElement("div"); //2 divs with correct classes added here..
    wordDiv.classList.add("mui--col-md-6,mui--text-accent"); //not sure if these classes ar working. doesn't appear so
    var wordTrans = document.createElement("div");
    wordTrans.classList.add("mui-col-md-6");
    var wrd = wordsArr[i]; //get the 'i' index value from complete local storage array
    var def = localStorage.getItem(wrd); // get the translation value of that word in local storage

    wordDiv.textContent = wrd; //put the word in the div
    wordTrans.textContent = def; // put the definition in other div

    wordlistEl.appendChild(wordTrans); //appending both divs to the large wordlistEl section on the favorites page
    wordlistEl.appendChild(wordDiv);
  }
};
createFavs();
