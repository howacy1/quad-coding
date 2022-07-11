// when spanish button is clicked, translate word from text box into spanish and display in translated text box
// - need function to handle click event
// - need function to call the translate endpoint with a given word and language code
// - need function to display translated text

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

// ---Abbey comments start here---
var wordlistEl = document.querySelector(".word-list"); //selects the <section> element on favorites.html
var wordsArr = []; // an array to hold the words(that are also the keys to the translation values)

//function to create the divs/append to page(would go/get called INSIDE the below fucntion), containing the word from storage(key) and the translation(value)..
var createFavs = function () {
  var wordDiv = document.createElement("div"); //2 divs with coreect classes added here..
  $(wordDiv).addClass("mui-col-md-3 mui--text-accent");
  var wordTrans = dicument.createElement("div");
  $(wordTrans).addClass("mui-col-md-9");
  //code needs to go here to get the word value from the array of words saved and
  //get the translation values from the local storage, stored with the words as keys..
  //and put those values in the appropriate divs before appending...
  wordlistEl.appendChild(wordDiv);
  wordlistEl.appendChild(wordTrans);
};

//function to save word/ translation key/value pair
var saveWords = function () {
  wordsArr.push(userText); //first push word to the array
  console.log(wordsArr);
  var transEl = document.querySelector("#translation-container"); //select the div that will have the dynamiclly created translation text
  var translation = transEl.textContent; //select the text inside that div
  JSON.stringify(localStorage.setItem(userText, translation)); // set the user word input and translation key/values to local storage..
};
