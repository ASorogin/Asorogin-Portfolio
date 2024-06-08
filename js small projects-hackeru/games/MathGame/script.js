let operators = ["+", "-", "*"];
const startBtn = document.getElementById ("start-btn");
const question = document.getElementById ("question");
const control = document.querySelector(".control-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
let answerValue;
let operatorQuestion;

//random value generator
const randomValue = (min,max) => Math.floor(Math.random() * (max - min)) + min;

const questionGenerator = () => {
    //two random values between 1 and 20
    let [num1,num2] = [randomValue(1,20), randomValue(1, 20)];
    

    //getting random operator
    let randomOperator = operators[Math.floor(Math.random() * operators.length)];

    if(randomOperator == "-" && num2 > num1){
        [num1,num2] = [num2,num1];
    }

    //solve question
    let solution = eval(`${num1}${randomOperator}${num2}`);

    //placing input at randomk pos
    //(1 for num1, 2 for num2, 3for operator, anything elde for solution)
    let randomVar = randomValue(1, 5);
    if(randomVar == 1){
        answerValue = num1;
        question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\>${randomOperator}${num2} = ${solution}`;
    } else if (randomVar == 2) {
        answerValue = num2;
        question.innerHTML = `${num1}${randomOperator} <input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
    } else if (randomVar == 3){
        answerValue = randomOperator;
        operatorQuestion = true;
        question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2}= ${solution}`;
    } else {
        answerValue = solution;
        question.innerHTML = `${num1} ${randomOperator} ${num2}= <input type="number" id="inputValue" placeholder="?"\> `;
    }


    // user input check

    submitBtn.addEventListener("click", () => {
        errorMessage.classList.add("hide");
        let userInput = document.getElementById("inputValue").value;
        if(userInput){
            if (userInput == answerValue){
                stopGame(`Yay!!<span>Correct</span> Answer`);
            }else if (operatorQuestion && !operators.includes(userInput)){
                errorMessage.classList.remove("hide");
                errorMessage.innerHTML = "please enter a valid operator";
            }else {
                stopGame(`Oops!!<span>Wrong</span> Answer`);
            }
        }else {
            errorMessage.classList.remove("hide");
            errorMessage.innerHTML="Input Cannot Be Empty";
        }
    });
};

//start Game
startBtn.addEventListener("click", () => {
    operatorQuestion = false;
    answerValue = "";
    errorMessage.innerHTML = "";
    errorMessage.classList.add("hide");
    control.classList.add("hide");
    startBtn.classList.add("hide");
    questionGenerator();
});

//endgame
const stopGame = (resultText) => {
    result.innerHTML = resultText;
    startBtn.innerHTML = "Restart";
    control.classList.remove("hide");
    startBtn.classList.remove("hide");
}
