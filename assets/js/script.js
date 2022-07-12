// top of code vars
// variables from html page used in js functions
var wordText = document.querySelector("#word-text");
var languageButtonsEl = document.querySelector("#language-buttons");
var translatedBoxContainerEl = document.querySelector("#translated-container");

//  function handles when when user clicks one of the the language buttons to translate
var buttonLanguageTranslate = function (event) {
  // gets the language code from the clicked element, gets the text the user wants to translate from the word text box
  var language = event.target.getAttribute("data-language");
  var userText = wordText.value.trim();

  // if things are entered then runs the translate function and inputting the text and language code
  if (language && userText) {
    getTranslatedText(userText, language, displayTranslatedText);

    // clear old content
    translatedBoxContainerEl.textContent = "";
  }
  // since this only happens if one of the translate buttons are click, can assume text is not entered?
  else {
    alert("Please enter text to translate.");
  }
};

// function that translates the text
var getTranslatedText = function (text, langugeCode, callback) {
  // this is how the rapidAPI tutorial shows getting a request from the google translate api, they had it hard coded with strings.
  // hoping the text and languageCode work as expected here. not really sure on the new URLSearchParams().

  // sets the search parameters to the text and what language the user wants to translate into
  var encodedParams = new URLSearchParams();
  encodedParams.append("q", text);
  encodedParams.append("target", langugeCode);
  encodedParams.append("source", "en");

  // API stuff and includes search parameters in body
  var options = {
    // rapidAPI website has this in single quotes in their tutorial, is double ok or no?
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "e0dde8d346mshc3dc29fff2e98a7p1e2eadjsnc63eb90e755c",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    body: encodedParams,
  };

  // makes request to google translate API, using the options variable
  fetch(
    "https://google-translate1.p.rapidapi.com/language/translate/v2",
    options
  )
    .then(function (response) {
      response.json().then(function (data) {
        var translatedText = data.data.translations[0].translatedText;
        callback(translatedText);
      });
    })
    // if error alerts error to user
    .catch((err) => alert(err));
};
// displaying the text in a seperate function would let us in the future add things to each specific language in the future.
// like displaying the word Spanish when user translates into spanish. Easier to do it this way then in the getTranslate function? This is also how our homework does it.
var displayTranslatedText = function (translatedText) {
  var translatedTextEl = document.createElement("p");
  translatedTextEl.textContent = translatedText;
  translatedBoxContainerEl.appendChild(translatedTextEl);
};
// when one of the languages to translate into is clicked, this catches that action from that div
languageButtonsEl.addEventListener("click", buttonLanguageTranslate);

// ---Abbey comments start here, Sarah's attempt at the storage/ favorites page logic below---

var saveEl = document.querySelector("#save"); //selects save button as a variable
var wordlistEl = document.querySelector(".word-list"); //selects the <section> element on favorites.html
var wordsArr = []; // ? an array to hold the words(that are also the keys to the translation values)..to be
//used in the for loop?

//**function to create the divs/append to page(would go/get called INSIDE the below function but also
//called upon load page), containing the word from storage(key) and the translation(value)..
var createFavs = function () {
  wordsArr = JSON.parse(localStorage.getItem(array)); //set 'wordsArr' array equal to full array in local storage
  if (userText) {
    // push new word to the wordsArr array IF a new userText value exists(not on load page)
    wordsArr.push(userText);
  }
  //?start for loop to loop through array in storage to get keys(words) and translations?
  for (i = 0; i < wordsArr.length; i++) {
    var wordDiv = document.createElement("div"); //2 divs with coreect classes added here..
    $(wordDiv).addClass("mui-col-md-3 mui--text-accent");
    var wordTrans = document.createElement("div");
    $(wordTrans).addClass("mui-col-md-9");
    var wrd = JSON.parse(localStorage.getItem(array[i])); //get 'i' element(word) in the stored array
    var def = localStorage.getItem(wrd); // get the translation value of that word in local storage
    wordDiv.textContent = wrd; //put the word in the div
    wordTrans.textContent = def; // put the definition in other div

    wordlistEl.appendChild(wordDiv); //appending both divs to the large wordlistEL section on the favorites page
    wordlistEl.appendChild(wordTrans);
  }
};

//**function to save word/ translation key/value pair and get onto favs page, upon
//save button click..
var saveWord = function () {
  //
  var translation = translatedBoxContainerEl.textContent; //select the text inside that div
  localStorage.setItem(userText, translation); // set the new user word input and translation key/values to local storage..
  createFavs(); //call this here ?  and upon load of page too?
};

saveEl.addEventListener("click", saveWord); //listens for save button click
