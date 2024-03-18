// Nom de l'API : countryapi.io

// S'enregistrer sur countryapi.io et récupérer votre clé API

// Faire QCM pour deviner des capitales 

// 1) On veut aficher aléatoirement le nom du pays + le drapeau 
// 2) En dessous on voudra un input pour insérer le nom de la capitale 
// 3) Un bouton de validation 
// 4) Une fois validé on obtient le résultat (C'est vrai ou pas)
// 5) Une fois validé on veut aussi un bouton qui nous emmène a la question suivante 

// Comptabiliser les points et stopper les questions au bout de 10 

// Bien vous renseigner sur la structure des données recues afin de coder ce QCM

// Indice : Pourquoi ne pas choisir aléatoirement le pays en passant par son code pays 
// (et en les regroupant dans un tableau ...)

//to lowerCase() et trim() pour les réponses

// my key
// const key = 'YF9Xsd5PnPosDQmnIUzbHhnIxKHJZC1oWkqbg0pG'
// alt key
const key = '1LANPVUkED6xyCIjkRVVQAD0WC2xgoa709ko9v0c'

// flag <img>
flag = document.querySelector('#flag')

// Country Name <h2>
countryName = document.querySelector('#country-name')

// player answer <input>
input = document.querySelector('#player-answer')

// player score <h2>
pScore = document.querySelector('#player-score')

// button <input> 'Valider/Suivant'
submit = document.querySelector('#submit')

// uh <div> containing the button?
div = document.querySelector('div')

// statement if youre right or wrong <h2>
trueOrFalse = document.querySelector('#true-false')

// display the player answer <h2> whether it's right or wrong
const output = document.querySelector('#output')

// useless
// countries = []

//score number
score = 0

//------------------------------------------------------------------------

updateScore = () => {
    pScore.textContent = `Score : ${score}`
}

updateScore()

fetch(`https://countryapi.io/api/all?apikey=${key}`)
    .then(response => response.json())
    .then(data => {

            // console.log(data)

        // store the countries shortcodes in an array
        const countries = Object.keys(data)

        // call the function to choose a random country
        chooseRandomCountry(data, countries)

            // console.log(countries)
    })
    .catch(error => console.error(error))
    

function chooseRandomCountry(data, countries){
    // declare the index of the random country from the array above
    // randomIndex = random (number) between 0 and the length of the array
    const randomIndex = Math.floor(Math.random() * countries.length)

    // declare the 'randomCode' code linked to the 'randomIndex'
    // randomCode = shortcode, 2chars (string)
    const randomCode = countries[randomIndex]

    // declare the 'randomCountry' object linked to the randomCode
    // randomCountry = chosen country data (object)
    const randomCountry = data[randomCode]

    //Title (html) change to the random country name (object.name)
    countryName.textContent = randomCountry.name

    // declare the answer to the question (object.capital)
    answer = randomCountry.capital

    // change the flag image to the random country flag (shortCode)
    flag.src = `https://flagcdn.com/96x72/${randomCode}.png`

        // console.log(randomCountry.capital)

}

// state will help us determine if player is answering or if the answer is being displayed
// used for button states
let state = 'question'


submit.addEventListener('click', (data) => {
//when the (submit) button is clicked

    // The player is supposed to answer
    if (state === 'question'){

        // The player's answer is correct
        if (input.value === answer){

            // switch to answer state
            state = 'answer'
            // change the button text to 'Next'
            submit.value = 'Suivant'
            // change the text to 'Correct'
            console.log('Correct')
            trueOrFalse.textContent = 'Correct'
            // add 1 to the score
            score++
            // display the updated score
            updateScore()
            // clear the input
            input.value = ''
            // tell the player that their answer is correct
            output.textContent = answer + " ✔"
            // give it a class for coloring purpose 
            output.classList = 'correct'
            
                // chooseRandomCountry(data)

        // The player's answer is incorrect
        } else {

            console.log('Wrong')

            // switch to answer state
            state = 'answer'
            // change the button text to 'Next'
            submit.value = 'Suivant'
            // tell the player that their answer is incorrect + the correct answer
            trueOrFalse.textContent = 'Faux, la capitale est ' + answer
            // display the player wrong answer
            output.textContent = input.value
            // give it a class for coloring purpose
            output.classList = 'wrong'
        }

        // POSSIBLE IMPROVEMENTS?

        // should check trueOrFalse/output difference
        // right and wrong logics are not in the same order
        // some of the logic is redundant

    // The player is supposed to go to the next question
    } else if (state === 'answer'){
        // switch to question state
        state = 'question'
        // change the button text to 'Valider'
        submit.value = 'Valider'
        // clear the answer display
        trueOrFalse.textContent = ''
        // clear the input
        input.value = ''
    }
    
    // call the function to choose a random country
    chooseRandomCountry(data)
})

// When Alt + click, display some debug infos
// state, answer, score
window.addEventListener('click', (e) => {
    if (e.altKey === true){
        console.log(state)
        console.log(answer)
        console.log(score)
    }
})