// ==================== SCENARIO DATA (ENGLISH) ====================

const scenarios = {
    1: {
        question: "Scenario 1A: A customer wants to change their spicy chicken to non-spicy. What should you do?",
        options: [
            { text: "A. Apologize and exchange it immediately.", isCorrect: true },
            { text: "B. Refuse to change it.", isCorrect: false },
            { text: "C. Show attitude but change it anyway.", isCorrect: false }
        ],
        correctMsg: "Correct! Always prioritize customer satisfaction.",
        incorrectMsg: "Not quite. Stay polite and support the customer."
    },

    101: {
        question: "Scenario 1B: A customer asks about allergens but you're not sure about the answer. What do you do?",
        options: [
            { text: "A. Make a random guess.", isCorrect: false },
            { text: "B. Politely ask to double-check the information.", isCorrect: true },
            { text: "C. Say 'I don’t know' and ignore it.", isCorrect: false }
        ],
        correctMsg: "Correct! Never guess when it comes to allergies.",
        incorrectMsg: "Not correct. You must verify information safely."
    },

    2: {
        question: "Scenario 2A: A customer is angry because they've waited 15 minutes. What is the best response?",
        options: [
            { text: "A. Get angry back.", isCorrect: false },
            { text: "B. Stay calm and apologize for the wait.", isCorrect: true },
            { text: "C. Give a long explanation.", isCorrect: false }
        ],
        correctMsg: "Correct! Stay calm, apologize, and focus on solving the issue.",
        incorrectMsg: "Not the best choice. Avoid arguing or over-explaining."
    },

    201: {
        question: "Scenario 2B: A coupon expired 2 days ago. What do you do?",
        options: [
            { text: "A. Refuse immediately.", isCorrect: false },
            { text: "B. Politely explain and offer another promotion.", isCorrect: true },
            { text: "C. Secretly accept it.", isCorrect: false }
        ],
        correctMsg: "Correct! Follow policy but still provide good service.",
        incorrectMsg: "Not quite. You must balance rules and hospitality."
    },

    3: {
        question: "Scenario 3A: After giving change, what should you say to the customer?",
        options: [
            { text: "A. Have a nice day.", isCorrect: false },
            { text: "B. Ask them to check their order and thank them.", isCorrect: true },
            { text: "C. Say nothing.", isCorrect: false }
        ],
        correctMsg: "Good! Reminding customers reduces complaints.",
        incorrectMsg: "Not correct."
    },

    301: {
        question: "Scenario 3B: A coworker drops a fries box on the floor. What should you do?",
        options: [
            { text: "A. Ignore it.", isCorrect: false },
            { text: "B. Ask them to replace it immediately.", isCorrect: true },
            { text: "C. Tell them after the shift.", isCorrect: false }
        ],
        correctMsg: "Correct! Cleanliness and food safety come first.",
        incorrectMsg: "Not correct. It must be handled immediately."
    }
};

// ==================== MODAL LOGIC (unchanged) ====================

const modal = document.getElementById("scenario-modal");
const closeBtn = document.querySelector(".close-btn");
const questionEl = document.getElementById("scenario-question");
const optionsContainer = document.getElementById("answer-options-container");
const feedbackEl = document.getElementById("feedback");

document.querySelectorAll('.btn-enter').forEach(button => {
    button.addEventListener('click', function () {
        const courseSet = this.getAttribute('data-course-set');
        loadScenario(courseSet);
        modal.style.display = "block";
    });
});

function loadScenario(courseSet) {
    const ids = courseSet.split(',').map(id => id.trim());
    const randomId = ids[Math.floor(Math.random() * ids.length)];
    const scenario = scenarios[randomId];

    optionsContainer.innerHTML = '';
    feedbackEl.style.display = 'none';
    feedbackEl.className = 'feedback-message';

    questionEl.textContent = scenario.question;
    optionsContainer.dataset.currentScenarioId = randomId;

    scenario.options.forEach(option => {
        const div = document.createElement('div');
        div.classList.add('answer-option');
        div.textContent = option.text;
        div.dataset.isCorrect = option.isCorrect;
        div.addEventListener('click', checkAnswer);
        optionsContainer.appendChild(div);
    });
}

function checkAnswer() {
    const scenarioId = optionsContainer.dataset.currentScenarioId;
    const scenario = scenarios[scenarioId];
    const isCorrect = this.dataset.isCorrect === "true";

    document.querySelectorAll('.answer-option').forEach(opt => {
        opt.removeEventListener('click', checkAnswer);
        opt.style.pointerEvents = "none";

        if (opt.dataset.isCorrect === "true") opt.style.backgroundColor = "#38761d";
        else if (opt === this) opt.style.backgroundColor = "#cc0000";
    });

    feedbackEl.textContent = isCorrect ? scenario.correctMsg : scenario.incorrectMsg;
    feedbackEl.classList.add(isCorrect ? "correct" : "incorrect");
    feedbackEl.style.display = "block";

    setTimeout(() => modal.style.display = "none", 3000);
}

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = event => {
    if (event.target === modal) modal.style.display = "none";
};
