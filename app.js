// ========================================
// DATA SOAL
// ========================================

const quizData = [
    {
        question: "Apa kepanjangan dari HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlink Text Mode Language"
        ],
        correct: 0
    },

    {
        question: "CSS digunakan untuk apa?",
        options: [
            "Membuat database",
            "Mengatur tampilan halaman web",
            "Membuat server",
            "Mengirim email"
        ],
        correct: 1
    },

    {
        question: "Apa fungsi JavaScript pada website?",
        options: [
            "Membuat website interaktif",
            "Mengganti sistem operasi",
            "Membuat kabel jaringan",
            "Menghapus browser"
        ],
        correct: 0
    },

    {
        question: "Apa kepanjangan dari DOM?",
        options: [
            "Document Object Model",
            "Data Object Management",
            "Digital Online Method",
            "Document Online Manager"
        ],
        correct: 0
    },

    {
        question: "Method apa yang digunakan untuk memilih satu elemen DOM pertama yang cocok?",
        options: [
            "querySelector()",
            "selectElement()",
            "getFirst()",
            "findElement()"
        ],
        correct: 0
    }
];


// ========================================
// STATE
// ========================================

let currentQuestion = 0;

let score = 0;

let answered = false;


// ========================================
// DOM ELEMENTS
// ========================================

const quizContent =
    document.querySelector("#quizContent");

const questionEl =
    document.querySelector("#question");

const optionsEl =
    document.querySelector("#options");

const progressEl =
    document.querySelector("#progress");

const nextBtn =
    document.querySelector("#nextBtn");

const feedbackEl =
    document.querySelector("#feedback");

const resultEl =
    document.querySelector("#result");

const scoreEl =
    document.querySelector("#score");

const highScoreEl =
    document.querySelector("#highScore");

const restartBtn =
    document.querySelector("#restartBtn");


// ========================================
// RENDER QUESTION
// ========================================

const renderQuestion = () => {

    const question =
        quizData[currentQuestion];


    // Reset status jawaban
    answered = false;


    // Update progress
    progressEl.textContent =
        `Soal ${currentQuestion + 1}/${quizData.length}`;


    // Menampilkan pertanyaan
    questionEl.textContent =
        question.question;


    // Mengosongkan pilihan sebelumnya
    optionsEl.textContent = "";


    // Mengosongkan feedback
    feedbackEl.textContent = "";


    // Sembunyikan tombol next
    nextBtn.classList.add("hidden");


    // Membuat tombol pilihan menggunakan createElement
    question.options.forEach((option, index) => {

        const button =
            document.createElement("button");


        button.textContent = option;


        button.classList.add("option-btn");


        // Menyimpan index jawaban
        button.dataset.index = index;


        // Menambahkan tombol ke DOM
        optionsEl.append(button);

    });

};


// ========================================
// EVENT DELEGATION
// ========================================

optionsEl.addEventListener("click", (event) => {

    // Cari tombol yang diklik
    const button =
        event.target.closest(".option-btn");


    // Kalau bukan tombol pilihan, hentikan
    if (!button) {
        return;
    }


    // Jangan izinkan menjawab dua kali
    if (answered) {
        return;
    }


    answered = true;


    // Ambil index jawaban
    const selectedIndex =
        Number(button.dataset.index);


    // Ambil jawaban benar
    const correctIndex =
        quizData[currentQuestion].correct;


    // Ambil semua tombol
    const buttons =
        optionsEl.querySelectorAll(".option-btn");


    // Cek jawaban
    if (selectedIndex === correctIndex) {

        button.classList.add("correct");

        feedbackEl.textContent =
            "✅ Jawaban kamu benar!";

        feedbackEl.style.color = "#16a34a";

        score++;

    } else {

        button.classList.add("wrong");

        feedbackEl.textContent =
            "❌ Jawaban kamu salah.";

        feedbackEl.style.color = "#dc2626";


        // Tampilkan jawaban yang benar
        buttons.forEach((btn) => {

            if (
                Number(btn.dataset.index)
                === correctIndex
            ) {

                btn.classList.add("correct");

            }

        });

    }


    // Tampilkan tombol next
    nextBtn.classList.remove("hidden");

});


// ========================================
// NEXT BUTTON
// ========================================

nextBtn.addEventListener("click", () => {

    currentQuestion++;


    if (currentQuestion < quizData.length) {

        renderQuestion();

    } else {

        showResult();

    }

});


// ========================================
// MENAMPILKAN HASIL
// ========================================

const showResult = () => {

    const total =
        quizData.length;


    const percentage =
        Math.round((score / total) * 100);


    // Menampilkan skor
    scoreEl.textContent =
        `${score}/${total} (${percentage}%)`;


    // Ambil high score dari LocalStorage
    const savedHighScore =
        Number(localStorage.getItem("quizHighScore")) || 0;


    // Jika skor baru lebih tinggi
    if (percentage > savedHighScore) {

        localStorage.setItem(
            "quizHighScore",
            percentage
        );

        highScoreEl.textContent =
            `${percentage}% 🎉 Rekor Baru!`;

    } else {

        highScoreEl.textContent =
            `${savedHighScore}%`;

    }


    // Sembunyikan quiz
    quizContent.classList.add("hidden");


    // Tampilkan hasil
    resultEl.classList.remove("hidden");

};


// ========================================
// RESTART QUIZ
// ========================================

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    answered = false;


    // Sembunyikan hasil
    resultEl.classList.add("hidden");


    // Tampilkan quiz
    quizContent.classList.remove("hidden");


    // Tampilkan soal pertama
    renderQuestion();

});


// ========================================
// JALANKAN QUIZ
// ========================================

renderQuestion();