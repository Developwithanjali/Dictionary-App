'use strict';

const inputBox = document.querySelector(".input");
const title = document.querySelector(".speech-box");
const button = document.querySelector("button");

function dictionaryApp() {
    const word = inputBox.value;
    if (!word) {
        title.innerHTML = '<h2 class = "heading">Please enter a word.</h2>';
        return;
    }
    
    const request = new XMLHttpRequest();
    request.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    request.send();

    request.addEventListener('load', function () {
            const [data] = JSON.parse(this.responseText);
            title.innerHTML = '';
            const html = `
                <h1><span>Word: </span>${data.word}</h1>
                <h2><span>Part of speech: </span>${data.meanings[0].partOfSpeech}</h2>
                <h2><span>Meaning: </span>${data.meanings[0].definitions[0].definition}</h2>
                <h2><span>Synonyms: </span>${data.meanings[0].synonyms.length ? data.meanings[0].synonyms.join(', ') : 'None'}</h2>
                <h2><span>Examples: </span>${data.meanings[0].definitions[0].example || 'None'}</h2>
            `;
            title.insertAdjacentHTML('beforeend', html);
    });
    

    request.addEventListener('error', function () {
        title.innerHTML = '<h2>An error occurred while fetching data.</h2>';
    });
}

button.addEventListener("click", dictionaryApp);
