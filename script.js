// ==================== SCENARIO DATA ====================

const scenarios = {
    1: {
        question: "Tình huống 1A: Khách muốn đổi gà cay sang gà không cay...",
        options: [
            { text: "A. Xin lỗi và đổi ngay.", isCorrect: true },
            { text: "B. Không cho đổi.", isCorrect: false },
            { text: "C. Tỏ thái độ rồi đổi.", isCorrect: false }
        ],
        correctMsg: "Chính xác! Luôn ưu tiên khách hàng.",
        incorrectMsg: "Chưa đúng. Hãy thân thiện và hỗ trợ khách."
    },

    101: {
        question: "Tình huống 1B: Khách hỏi dị ứng nhưng bạn không chắc...",
        options: [
            { text: "A. Đoán đại.", isCorrect: false },
            { text: "B. Xin phép kiểm tra thông tin.", isCorrect: true },
            { text: "C. Nói 'không biết' rồi bỏ qua.", isCorrect: false }
        ],
        correctMsg: "Đúng! Tuyệt đối không đoán khi liên quan dị ứng.",
        incorrectMsg: "Chưa chuẩn rồi!"
    },

    2: {
        question: "Tình huống 2A: Khách la mắng vì chờ 15 phút...",
        options: [
            { text: "A. Gắt lại.", isCorrect: false },
            { text: "B. Giữ bình tĩnh + xin lỗi.", isCorrect: true },
            { text: "C. Giải thích dài dòng.", isCorrect: false }
        ],
        correctMsg: "Chuẩn! Bình tĩnh – xin lỗi – giải quyết.",
        incorrectMsg: "Không nên gắt hoặc giải thích quá nhiều."
    },

    201: {
        question: "Tình huống 2B: Phiếu giảm giá hết hạn 2 ngày...",
        options: [
            { text: "A. Từ chối thẳng.", isCorrect: false },
            { text: "B. Giải thích nhẹ + đề xuất khuyến mãi khác.", isCorrect: true },
            { text: "C. Lén cho qua.", isCorrect: false }
        ],
        correctMsg: "Đúng! Vừa giữ quy tắc vừa giữ khách.",
        incorrectMsg: "Chưa đúng rồi."
    },

    3: {
        question: "Tình huống 3A: Sau khi trả tiền thừa, bạn cần nói gì?",
        options: [
            { text: "A. Chúc ngày tốt lành.", isCorrect: false },
            { text: "B. Nhắc kiểm tra đơn hàng + cảm ơn.", isCorrect: true },
            { text: "C. Im lặng.", isCorrect: false }
        ],
        correctMsg: "Rất tốt! Nhắc kiểm tra đơn giảm khiếu nại.",
        incorrectMsg: "Chưa đúng."
    },

    301: {
        question: "Tình huống 3B: Đồng nghiệp làm rơi hộp khoai...",
        options: [
            { text: "A. Bỏ qua.", isCorrect: false },
            { text: "B. Yêu cầu thay ngay.", isCorrect: true },
            { text: "C. Nhắc sau ca.", isCorrect: false }
        ],
        correctMsg: "Chuẩn! Vệ sinh là số 1.",
        incorrectMsg: "Phải xử lý ngay."
    }
};

// ==================== MODAL LOGIC ====================

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
