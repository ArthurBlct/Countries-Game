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

// ok key
// const key = 'YF9Xsd5PnPosDQmnIUzbHhnIxKHJZC1oWkqbg0pG'
const key = '1LANPVUkED6xyCIjkRVVQAD0WC2xgoa709ko9v0c'


flag = document.querySelector('#flag')
countryName = document.querySelector('#country-name')
pAnswer = document.querySelector('#player-answer')
pScore = document.querySelector('#player-score')
submit = document.querySelector('#submit')
// next = document.querySelector('#next')
div = document.querySelector('div')
trueOrFalse = document.querySelector('#true-false')
const output = document.querySelector('#output')
// countries = []
score = 0

updateScore = () => {
    pScore.textContent = `Score : ${score}`
}

updateScore()

fetch(`https://countryapi.io/api/all?apikey=${key}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        // console.log(Object.keys(data))
        const countries = Object.keys(data)
        chooseRandomCountry(data, countries)
        console.log(countries)
    })
    .catch(error => console.error(error))
    

function chooseRandomCountry(data, countries){
    const randomIndex = Math.floor(Math.random() * countries.length)
    const randomCode = countries[randomIndex]
    const randomCountry = data[randomCode]
    countryName.textContent = randomCountry.name
    answer = randomCountry.capital
    console.log(randomCountry.capital)
    flag.src = `https://flagcdn.com/96x72/${randomCode}.png`
}

// function chooseRandomCountry(data){
//     chosenCountry = countries[(Math.floor(Math.random() * countries.length))]
//     console.log(chosenCountry)

//     ////flag.src = `https://flagcdn.com/96x72/${chosenCountry}.png`
//     // countryName.textContent = data[chosenCountry].name
//     // answer = data[chosenCountry].capital
// }

let state = 'question'

// function buttonStates(){    
//     if (state === 'question'){
//         submit.value = 'Valider'
//     } else {
//         submit.value = 'Suivant'
//     }
// }

submit.addEventListener('click', (data) => {
    if (state === 'question'){
        if (pAnswer.value === answer){
            state = 'answer'
            submit.value = 'Suivant'
            console.log('Correct')
            trueOrFalse.textContent = 'Correct'
            score++
            updateScore()
            pAnswer.value = ''
            output.textContent = answer + " ✔"
            output.classList = 'correct'
            // buttonStates()
            // chooseRandomCountry(data)
            // NextButton()
        } else {
            console.log('Wrong')
            // state = 'answer'
            submit.value = 'Suivant'
            trueOrFalse.textContent = 'Faux, la capitale est ' + answer
            output.textContent = pAnswer.value
            output.classList = 'wrong'
            // buttonStates()
            // chooseRandomCountry(data)
            // NextButton()
        }
    } else if (state === 'answer'){
        state = 'question'
        submit.value = 'Valider'
        trueOrFalse.textContent = ''
        pAnswer.value = ''
    }
})

window.addEventListener('click', (e) => {
    if (e.altKey === true){
        console.log(state)
    }
})