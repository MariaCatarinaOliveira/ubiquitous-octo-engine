const question = document.querySelector('#question') ;
const choices = Array.from(document.querySelectorAll ('.choice-text')) ;
const progressText = document.querySelector('#progressText') ;
const scoreText = document.querySelector('#score') ;
const progressBarFull = document.querySelector ('#progressBarFull') ;
const choice1 = document.querySelector ('#choice1') ;
const choice2 = document.querySelector ('#choice2') ;
const choice1img = document.querySelector ('#choice1img') ;
const choice2img = document.querySelector ('#choice2img') ;

let currentQuestion = {} ;
let acceptingAnswers = true ;
let score = 0 ;
let questionCounter = 0 ;
let availableQuestions = [] ;

let questions = [
    {
        question: '@RIVERJPHOENIX: YOU NEVER REALISE HOW MANY JUMPSCARES THIS FILM HAS UNTIL YOURE WATCHING IT IN YOUR UNIS STUDENT CINEMA AND THE VOLUME IS UP WAY TOO LOUD FOR SOME REASON',
        choice1: 'BODIES BODIES BODIES (2022)',
        choice2: 'RATATOUILLE (2007)',
        answer: 2,
        img1: '/bodies_bodies_bodies_ver2_xlg.jpg',
        img2: '/ratatouille_xlg.jpg',
    },
    {
        question: '@STICKMENONCRACK: HAVENT SEEN A GLOW UP SO GOOD SINCE I TRANSITIONED GENDERS',
        choice1: 'SUSPIRIA (2018)',
        choice2: 'PUSS IN THE BOOTS: THE LAST WISH (2022)',
        answer: 2,
        img1: '/suspiria_ver23_xlg.jpg',
        img2: '/puss_in_boots_the_last_wish_xlg.jpg',
    },
    {
        question: '@HARINEF: NOT A CELL PHONE IN SIGHT. JUST GUYS BEING DUDES',
        choice1: 'THE LIGHTHOUSE (2019)',
        choice2: 'LUCA (2021)',
        answer: 1,
        img1: '/lighthouse_ver2_xlg.jpg',
        img2: '/luca_xlg.jpg',
    },
    {
        question: '@CHILDRENOFMEN: THERAPHY IS EXPENSIVE, USING THIS MOVIE AS A COPING MECHANISM IS FREE',
        choice1: 'HEREDITARY (2018)',
        choice2: 'COCO (2017)',
        answer: 1,
        img1: '/hereditary_ver2_xxlg.jpg',
        img2: '/coco_ver2_xlg.jpg',
    },
    {
        question: '@ECLECTIC_EM: LOVED THIS EVEN MORE ON REWATCH NOW THAT IVE GOT A BETTER UNDERSTANDING OF IT. BUMPING IT UP TO A 4.5. SURPRISED THAT MY MOTHER ABSOLUTELY LOVED THIS',
        choice1: 'MOTHER (2017)',
        choice2: 'TANGLED (2010)',
        answer: 1,
        img1: '/mother_xlg.jpg',
        img2: '/tangled_xlg.jpg',
    },
    {
        question: '@ELEMENTARII: THIS IS WHAT SLEEPOVERS FEEL LIKE WHEN YOU ARE 12',
        choice1: 'HOUSE (1977)',
        choice2: 'TURNING RED (2022)',
        answer: 1,
        img1: '/houseposter_500.jpg',
        img2: '/turning_red_xlg.jpg',
    },
    {
        question: '@FUNERALROSES: WHAT A NICE FAMILY FRIENDLY FILM ABOUT SISTERHOOD ❤',
        choice1: 'RAW (2016)',
        choice2: 'FROZEN (2013)',
        answer: 1,
        img1: '/raw_xlg.jpg',
        img2: '/frozen_xlg.jpg',
    },
    {
        question: '@WES10: SO CUTE! LOVE THIS NOTHING BAD HAPPENS 👍',
        choice1: 'MIDSOMMAR (2019)',
        choice2: 'BIG HERO 6 (2014)',
        answer: 2,
        img1: '/midsommar_ver2_xlg.jpg',
        img2: '/big_hero_six_ver2_xlg.jpg',
    },
    {
        question: '@BROFROMANOTHER: EMOTIONAL TERRORISM',
        choice1: 'BLACK SWAN (2010)',
        choice2: 'INSIDE OUT (2015)',
        answer: 2,
        img1: '/black_swan_xlg.jpg',
        img2: '/inside_out_xlg.jpg',
    },
    {
        question: '@SHUTTERISLAND: THIS IS AN ICONIC STAPLE IN MODERN CINEMA AND I CANNOT BE CONVINCED OTHERWISE',
        choice1: 'THE SHINING (1980)',
        choice2: 'SHREK (2001)',
        answer: 2,
        img1: '/shining_ver1_xlg.jpg',
        img2: '/shrek_ver2_xlg.jpg',
    }
];

const SCORE_POINTS = 100 ; 
const MAX_QUESTIONS = 10 ;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion ()
};

getNewQuestion = () =>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS ) {
       localStorage.setItem ('mostRecentScore', score)
        return window.location.assign('/end.html')
    };
    choice1.style.background = '#E6E6E6';
    choice2.style.background = '#E6E6E6';
    questionCounter ++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    choice1img.src = currentQuestion.img1;
    choice2img.src = currentQuestion.img2;
    console.log(questionsIndex);
    console.log(availableQuestions)
    question.innerText = currentQuestion.question
    choices.forEach(choice =>{
        const number = choice.dataset ['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
 };
choices.forEach(choice=>{
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        'incorrect'
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
            e.target.style.background = '#C0DAB9';
        } else if(classToApply === 'incorrect') {
            e.target.style.background = '#D95D5D';
        }
        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout ( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();
        }, 1000)
    })
})
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame();