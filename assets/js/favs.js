var wordlistEl = document.querySelector("#word-list"); //selects the <section> element on favorites.html
var wordsArr = []; // ? an array to hold the words(that are also the keys to the translation values)..

//**function to create the divs/append to page
var createFavs = function () {
  wordsArr = JSON.parse(localStorage.getItem("array"));
  console.log(wordsArr);
  //for loop to loop through array in storage to get keys(words) and translations?
  for (i = 0; i < wordsArr.length; i++) {
    var wordDiv = document.createElement("div"); //2 divs with correct classes added here..
    wordDiv.classList.add("mui--col-md-3,mui--text-accent");
    var wordTrans = document.createElement("div");
    wordTrans.classList.add("mui-col-md-9");
    var wrd = wordsArr[i]; //get the 'i' index value of complete array
    console.log(wrd);
    var def = localStorage.getItem(wrd); // get the translation value of that word in local storage
    console.log(def);

    wordDiv.textContent = wrd; //put the word in the div
    wordTrans.textContent = def; // put the definition in other div

    wordlistEl.appendChild(wordTrans); //appending both divs to the large wordlistEl section on the favorites page
    wordlistEl.appendChild(wordDiv);
  }
};
createFavs();
