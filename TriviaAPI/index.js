//https://opentdb.com/api_config.php

const getCategories = async () => {
    const responseCategory = await fetch('https://opentdb.com/api_category.php');
    const data = await responseCategory.json();

    const triviaCategories = data.trivia_categories;
    triviaCategories.forEach(genre => {
        const category = document.createElement('option');
        category.value = genre.id;
        category.textContent = genre.name;
        const selectCategory = document.querySelector('#category');
        selectCategory.appendChild(category);
    })
}

getCategories();


const getInputValue = () => {
    const amount = document.querySelector('#question-number').value;
    const category = document.querySelector('#category').value;
    const difficulty = document.querySelector('#difficulty').value;
    const type = document.querySelector('#type').value;

    return {
        amount,
        category,
        difficulty,
        type
    }
}

let questions = null;

const getQuiz = async (event) => {
    event.preventDefault();
    const {
        amount,
        category,
        difficulty,
        type
    } = getInputValue();

    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}&encode=base64`);
    const data = await response.json();
    
    questions = data.results;
    console.log(questions);

    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.style.display = 'none';

    showQuiz();
}

const showQuiz = () => {
    questions.forEach(question => {
        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = atob(question.question);
        div.appendChild(h3);
        const answers = question.incorrect_answers;
        const index = Math.floor(Math.random() * answers.length);
        answers.splice(index, 0, question.correct_answer);
        
        answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = atob(answer);
            button.classList.add('btn', 'btn-secondary', 'm-2');
            div.appendChild(button);

            button.addEventListener('click', (event) => {
                console.log(event);
                if(event.target.innerText === atob(question.correct_answer)) {
                    button.style.backgroundColor = 'green';
                    setTimeout(() => alert('Bravo!'), 500);
                } else {
                    button.style.backgroundColor = 'red';
                    setTimeout(() => alert('Hai sbagliato!'), 500);
                }
            })
        })

        const body = document.querySelector('body');
        body.appendChild(div);
    })
}