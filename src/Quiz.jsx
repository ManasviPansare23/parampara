
import { useState } from "react";
import "./Quiz.css";

const questions = [
  {
    question: "What was the Gurukul system primarily known for?",
    options: [
      "Learning from a guru",
      "Online education",
      "Factory training",
      "Space exploration",
    ],
    answer: 0,
    explanation:
      "The Gurukul tradition emphasized learning under the guidance of a teacher, often in a residential setting.",
  },
  {
    question: "Which practice is associated with meditation and breath awareness?",
    options: ["Sculpture", "Yoga", "Architecture", "Metalworking"],
    answer: 1,
    explanation:
      "Yoga traditions include practices involving breath awareness, concentration, and meditation.",
  },
  {
    question: "Ayurveda is a traditional knowledge system associated with what?",
    options: [
      "Shipbuilding only",
      "Astronomy only",
      "Health and well-being",
      "Political elections",
    ],
    answer: 2,
    explanation:
      "Ayurveda is a traditional Indian health system that includes approaches to diet, lifestyle, and well-being.",
  },
  {
    question: "Which of these is an example of historic Indian architecture?",
    options: [
      "A modern smartphone",
      "A digital spreadsheet",
      "A computer processor",
      "A rock-cut cave monument",
    ],
    answer: 3,
    explanation:
      "Rock-cut caves are an important part of India's diverse architectural heritage.",
  },
  {
    question: "What is one useful way to study traditional knowledge today?",
    options: [
      "Accept every claim without checking",
      "Compare reliable historical and academic sources",
      "Ignore historical context",
      "Avoid asking questions",
    ],
    answer: 1,
    explanation:
      "Comparing credible sources helps us understand traditions in their historical context and distinguish evidence from belief.",
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  function chooseAnswer(index) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    if (index === questions[currentQuestion].answer) {
      setScore((previousScore) => previousScore + 1);
    }
  }

  function nextQuestion() {
    if (currentQuestion === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer(null);
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <section className="quiz-container">
        <div className="quiz-result">
          <div className="quiz-result-icon">
            {percentage >= 80 ? "🏆" : percentage >= 40 ? "🌿" : "📚"}
          </div>

          <span className="quiz-eyebrow">QUIZ COMPLETED</span>
          <h2>Your learning journey continues!</h2>
          <div className="quiz-final-score">
            {score} <span>/ {questions.length}</span>
          </div>
          <p>
            You answered {score} out of {questions.length} questions correctly
            ({percentage}%).
          </p>

          <button className="quiz-primary-button" onClick={restartQuiz}>
            Try again ↻
          </button>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];

  return (
    <section className="quiz-container">
      <div className="quiz-heading">
        <span className="quiz-eyebrow">TEST YOUR KNOWLEDGE</span>
        <h2>How much do you know?</h2>
        <p>Explore Indian heritage, one question at a time.</p>
      </div>

      <div className="quiz-card">
        <div className="quiz-progress-info">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>Score: {score}</span>
        </div>

        <div
          className="quiz-progress-track"
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={currentQuestion + 1}
        >
          <div
            className="quiz-progress-fill"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        <h3 className="quiz-question">{question.question}</h3>

        <div className="quiz-options">
          {question.options.map((option, index) => {
            let stateClass = "";

            if (selectedAnswer !== null && index === question.answer) {
              stateClass = "correct";
            } else if (
              selectedAnswer === index &&
              index !== question.answer
            ) {
              stateClass = "incorrect";
            }

            return (
              <button
                key={option}
                className={`quiz-option ${stateClass}`}
                onClick={() => chooseAnswer(index)}
                disabled={selectedAnswer !== null}
                aria-pressed={selectedAnswer === index}
              >
                <span className="quiz-option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
                {stateClass === "correct" && <span>✓</span>}
                {stateClass === "incorrect" && <span>×</span>}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div
            className={`quiz-feedback ${
              selectedAnswer === question.answer ? "feedback-correct" : ""
            }`}
            aria-live="polite"
          >
            <strong>
              {selectedAnswer === question.answer
                ? "Correct! Well done."
                : "Not quite — learn something new!"}
            </strong>
            <p>{question.explanation}</p>
          </div>
        )}

        <div className="quiz-actions">
          <span className="quiz-score-note">
            {selectedAnswer === null
              ? "Choose the best answer."
              : "Ready to continue?"}
          </span>

          <button
            className="quiz-primary-button"
            onClick={nextQuestion}
            disabled={selectedAnswer === null}
          >
            {currentQuestion === questions.length - 1
              ? "See results →"
              : "Next question →"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Quiz;
