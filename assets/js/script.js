// top of code vars
// variables from html page used in js functions
var wordText = document.querySelector("#word-text");
var languageButtonsEl = document.querySelector("#language-buttons");
var translatedBoxContainerEl = document.querySelector("#translated-container");

//define code here





//  function handles when when user clicks one of the the language buttons to translate
var buttonLanguageTranslate = function(event) {
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
var getTranslatedText = function(text, langugeCode, callback) {

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
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'e0dde8d346mshc3dc29fff2e98a7p1e2eadjsnc63eb90e755c',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
        },
        body: encodedParams
    };

    // makes request to google translate API, using the options variable
    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
        .then(function(response) {
            response.json().then(function(data) {
                var translatedText = data.data.translations[0].translatedText;
                callback(translatedText);
            });

        })
        // if error alerts error to user
        .catch(err => alert(err));
    
};
// displaying the text in a seperate function would let us in the future add things to each specific language in the future.
// like displaying the word Spanish when user translates into spanish. Easier to do it this way then in the getTranslate function? This is also how our homework does it.
var displayTranslatedText = function(translatedText) {

    var translatedTextEl = document.createElement("p");
    translatedTextEl.textContent = translatedText;
    translatedBoxContainerEl.appendChild(translatedTextEl);

};


// favorites function code


// this at end
// when one of the languages to translate into is clicked, this catches that action from that div
languageButtonsEl.addEventListener("click", buttonLanguageTranslate);