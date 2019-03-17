var panel = $('#quiz-area');
var countStartNumber = 30;
//Sound clips
var yaySound = new Audio("./assets/sound/yay.wav");
var badSound = new Audio("./assets/sound/wrong.mp3");
var finalSound = new Audio("./assets/sound/yipee.wav");
var themeSong = new Audio("./assets/sound/theme.mp3");


$(document).ready(function() {
    themeSong.play();
});

//CLICK EVENTS

$(document).on('click', '#start-over', function(e) {
    game.reset();
});

$(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
});

$(document).on('click', '#start', function(e) {
    $('.timer').append('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion();
    themeSong.pause();
});

//Question set

var questions = [{
    question: "Which child actress was originally offered the role of Regan MacNeill in 'The Exorcist'?",
    answers: ["Carrie Fisher", "Melissa Gilbert", "Lisa Bonet", "Dana Plato"],
    correctAnswer: "Dana Plato",
    image: "assets/images/danaPlato.jpg"
}, {
    question: "What classic horror movie features a serial killer in a William Shatner mask?",
    answers: ['Friday the 13th', 'Halloween', 'Texas Chainsaw Massacre', 'The Fog'],
    correctAnswer: "Halloween",
    image: "assets/images/michaelMyers.jpg"
}, {
    question: "In what horror movie does the protagonist write a book that contains only the line 'All work and no play makes Jack a dull boy' repeated over and over and over?",
    answers: ['The Ninth Gate', 'The Shining', 'The Devils Rain', 'The Witch'],
    correctAnswer: "The Shining",
    image: "assets/images/jack.jpg"
}, {
    question: "What horror movie features a serial killer wearing a mask inspired by an Edvard Munch painting?",
    answers: ['Halloween', 'Henry: Portrait of a Serial Killer', 'Scream', 'Killer Klowns from Outer Space'],
    correctAnswer: "Scream",
    image: "assets/images/ghostface.jpg"
}, {
    question: "What was the name of the real-life family who were murdered in the 'Amityville Horror' house?",
    answers: ['The Deffo Family', 'The Rossi Family', 'The Ross Family', 'The DeFalco Family'],
    correctAnswer: "The Deffo Family",
    image: "assets/images/amityville.jpg"
}];


var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,
    countdown: function() {
        game.counter--;
        $('#counter-number').html(game.counter);

        if (game.counter === 0) {
            console.log('TIME UP');
            game.timeUp();
        }
    },
    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>');
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
            panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
        }
    },
    nextQuestion: function() {
        game.counter = countStartNumber;
        $('#counter-number').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function() {
        badSound.play();
        clearInterval(timer);
        $('#counter-number').html(game.counter);

        panel.html('<h2>Out of Time!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
        panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    results: function() {
        finalSound.play();
        clearInterval(timer);

        panel.html('<h2>All done, heres how you did!</h2>');
        $('#counter-number').html(game.counter);
        panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
        panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
        panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        panel.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function(e) {
        clearInterval(timer);

        if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer) {
            this.answeredCorrectly();
        } else {
            this.answeredIncorrectly();
        }
    },
    answeredIncorrectly: function() {
        badSound.play();
        game.incorrect++;
        clearInterval(timer);
        panel.html('<h2>Nope!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    answeredCorrectly: function() {
        yaySound.play();
        clearInterval(timer);
        game.correct++;
        panel.html('<h2>Correct!</h2>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1) {
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },
    reset: function() {
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0;
        this.incorrect = 0;
        this.loadQuestion();
    }
};