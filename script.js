var questions = [{
    question: "1. What does HTML stand for?",
    choices: ["Hyper Text Modul Language", "Hyper Text Markup Language", "Hyper Test Markup Language", "Hyperlink Markup Language"],
    correctAnswer: 1
}, {
    question: "2. Where we can use <style> tag ?",
    choices: ["just in head element", "just in body element", "in head and in body elements", "None of the above."],
    correctAnswer: 1
}, {
    question: "3. Which tag would you use to create a hyperlink?",
    choices: ["a", "img", "dl", "p"],
    correctAnswer: 0
}, {
    question: "4. How you can open the link in new window?",
    choices: ["target= _new", "target=_window", "target=_blank", "None of the above."],
    correctAnswer: 2
}, {
    question: "5. What is the HTML element to display an image?",
    choices: ["image", "picture", "img", "pic"],
    correctAnswer: 2
}];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c = 60;
var t;
var audio = new Audio('Cheering.mp3');
var Tic_Tock = new Audio('Tic_ Tock.mp3');





$(document).ready(function() {
    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();


    timedCount();


    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function() {
        
        if (!quizOver) {
            var val = $("input[type='radio']:checked").val();

            if (val == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();
                if (val == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }
                iSelectedAnswer[currentQuestion] = val;

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();

                } else {
                    displayScore();
                    $('#iTimeShow').html('Quiz Time Completed!');
                    $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
                    audio.play();
                    Tic_Tock.pause();
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                    return false;

                }
            }

        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            c=60;
            $('#iTimeShow').html('Time Remaining:');
            iSelectedAnswer = [];
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            viewingAns = 1;
            displayCurrentQuestion();
            hideScore();
        }
    });
});



function timedCount() {
    if (c == 185) {
        return false;
    }
    Tic_Tock.play();
    var hours = parseInt(c / 3600) % 24;
    var minutes = parseInt(c / 60) % 60;
    var seconds = c % 60;
    var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    $('#timer').html(result);

    if (c == 0) {
        displayScore();
        $('#iTimeShow').html('Quiz Time Completed!');
        $('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
        audio.play();
        c = 60;
        $(document).find(".nextButton").text("Play Again?");
        quizOver = true;
        return false;

    }

    c = c - 1;
    t = setTimeout(function() {
        timedCount()
    }, 1000);
}


// This displays the current question AND the choices
function displayCurrentQuestion() {

    if (c == 185) {
        c = 60;
        timedCount();
    }
    //console.log("In display current Question");
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;


    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];

        if (iSelectedAnswer[currentQuestion] == i) {
            $('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
        } else {
            $('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
        }
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    audio.play();
    Tic_Tock.pause();
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}

// This displays the current question AND the choices
function viewResults() {

    if (currentQuestion == 10) { currentQuestion = 0; return false; }
    if (viewingAns == 1) { return false; }

    hideScore();
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;



    currentQuestion++;

    setTimeout(function() {
        viewResults();
    }, 3000);
}