// variables from html page used in js functions
var wordText = document.querySelector("#word-text");
var languageButtonsEl = document.querySelector("#language-buttons");
var defineButtonEl = document.querySelector("#define")
var translatedBoxContainerEl = document.querySelector("#translated-container");
var definitionContainerEl = document.querySelector("#definition-container");
var saveEl = document.querySelector("#save");//selects save button as a variable
// var wordlistEl = document.querySelector("#word-list"); //selects the <section> element on favorites.html
// var wordsArr = []; // ? an array to hold the words(that are also the keys to the translation values)..to be

// function handles when the define button is clicked
var buttonDefineWord = function () {
  var userDefineText = wordText.value.trim();
    if (userDefineText) {
      getDefinition(userDefineText, displayDefinition);
      definitionContainerEl.textContent = "";
    }
    else {
      alert("Please enter text to translate.");
    }
};

// function gets the definition of the word that the user entered and then runs the function to display the text
var getDefinition = function(text, callback) {

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9576f11888mshe5a182c29202f23p153609jsna5a6cd7a5875",
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com"
    }
  };
  
  fetch("https://wordsapiv1.p.rapidapi.com/words/" + text + "/definitions", options)
    .then(function (response) {
      console.log(response);
      response.json().then(function (data) {
        var definitionText = data.definitions[0].definition;
        callback(definitionText);
      });
    })
    // if error alerts error to user
    .catch((err) => alert(err));
};

// displays definition text
var displayDefinition = function(definition) {
  var definitionTextEl = document.createElement("p");
  definitionTextEl.textContent = definition;
  definitionContainerEl.appendChild(definitionTextEl);

};

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

  // sets the search parameters to the text and what language the user wants to translate into
  var encodedParams = new URLSearchParams();
  encodedParams.append("q", text);
  encodedParams.append("target", langugeCode);
  encodedParams.append("source", "en");

  // API stuff and includes search parameters in body
  var options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "9576f11888mshe5a182c29202f23p153609jsna5a6cd7a5875",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    body: encodedParams,
  };

  // makes request to google translate API, using the options variable
  fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", options)
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

//**function to save word/ translation key/value pair and the keys 'wordsArr' array, upon
//save button click..
var saveWord = function () {
  var userText = wordText.value;
  var translation = translatedBoxContainerEl.textContent; //select the text inside that div
  localStorage.setItem(userText, translation); // set the new user word input and translation key/values to local storage..
  if (localStorage.getItem("array")) {
    wordsArr = JSON.parse(localStorage.getItem("array")); //set 'wordsArr' array equal to full array in local storage
  }
  if (userText) {
    // push new word to the wordsArr array IF a new userText value exists(not on load page)
    wordsArr.push(userText);
    localStorage.setItem("array", JSON.stringify(wordsArr));
  }
  console.log(wordsArr);
  window.location.href = "./favorites.html"; //immediately route to favorites page so rest of the javascript for appending words to that page can run
};



// when one of the languages to translate into is clicked, this catches that action from that div
languageButtonsEl.addEventListener("click", buttonLanguageTranslate);
saveEl.addEventListener("click", saveWord); //listens for save button click
defineButtonEl.addEventListener("click", buttonDefineWord);