
import { useEffect, useState } from "react";
import "./WisdomVault.css";

const challenges = {
  Gurukul: [
    {
      question: "What was a Gurukul primarily known for?",
      options: [
        "Learning with a teacher",
        "Training only soldiers",
        "Trading spices",
        "Building ships",
      ],
      answer: 0,
      fact: "Gurukuls were traditional learning environments where students learned from a teacher, often through close daily interaction.",
    },
    {
      question: "Which quality was important in traditional learning?",
      options: [
        "Memorising without understanding",
        "Discipline and practical learning",
        "Avoiding questions",
        "Learning only from machines",
      ],
      answer: 1,
      fact: "Many traditional educational approaches valued discipline, dialogue, practice, and the development of character.",
    },
    {
      question: "Which ancient learning centre was renowned across Asia?",
      options: ["Nalanda", "Red Fort", "Gateway of India", "India Gate"],
      answer: 0,
      fact: "Nalanda was a major centre of learning in ancient India, attracting students and scholars from different regions.",
    },
  ],
  Yoga: [
    {
      question: "Which ancient text is closely associated with the systematisation of Yoga?",
      options: [
        "Arthashastra",
        "Yoga Sutras of Patanjali",
        "Natya Shastra",
        "Shilpa Shastra",
      ],
      answer: 1,
      fact: "The Yoga Sutras traditionally attributed to Patanjali are a foundational text on the philosophy and practice of Yoga.",
    },
    {
      question: "Which is a central part of many Yoga practices?",
      options: [
        "Mindful breathing",
        "Competitive eating",
        "Rapid driving",
        "Stone carving",
      ],
      answer: 0,
      fact: "Breath awareness is an important element in many Yoga traditions, alongside posture, concentration, and meditation.",
    },
    {
      question: "What does meditation mainly train?",
      options: [
        "Attention and awareness",
        "Architectural drawing",
        "Metal casting",
        "Speed reading only",
      ],
      answer: 0,
      fact: "Meditation practices commonly involve training attention and awareness, although methods and aims differ across traditions.",
    },
  ],
  Ayurveda: [
    {
      question: "Ayurveda is a traditional knowledge system primarily concerned with what?",
      options: [
        "Health and wellbeing",
        "Ocean navigation",
        "Military engineering",
        "Astronomical instruments only",
      ],
      answer: 0,
      fact: "Ayurveda is a traditional Indian system of health knowledge. Historical traditions and modern medical evidence should be distinguished.",
    },
    {
      question: "Which plant is widely discussed in Indian herbal traditions?",
      options: ["Tulsi", "Plastic fern", "Copper vine", "Glass flower"],
      answer: 0,
      fact: "Tulsi has a long-standing place in Indian cultural and herbal traditions. Traditional use does not establish that it treats every illness.",
    },
    {
      question: "Which source is important when checking a health claim?",
      options: [
        "A viral message alone",
        "Reliable scientific evidence",
        "A random advertisement",
        "A rumour from a stranger",
      ],
      answer: 1,
      fact: "Responsible health decisions distinguish traditional knowledge from claims supported by reliable scientific evidence.",
    },
  ],
  Architecture: [
    {
      question: "Which material was widely used in historic Indian stone temples?",
      options: ["Granite or sandstone", "Plastic sheets", "Foam boards", "Synthetic fabric"],
      answer: 0,
      fact: "Historic Indian temples used different local stones, including granite and sandstone, depending on region and period.",
    },
    {
      question: "What is a mandapa in many Hindu temples?",
      options: [
        "A pillared hall",
        "A type of ship",
        "A cooking spice",
        "A writing instrument",
      ],
      answer: 0,
      fact: "A mandapa is a pillared hall or pavilion found in many Hindu temple complexes.",
    },
    {
      question: "What often influenced the materials used in traditional buildings?",
      options: [
        "Local resources and climate",
        "Random selection only",
        "The colour of computers",
        "Modern plastic packaging",
      ],
      answer: 0,
      fact: "Regional building traditions often responded to available materials, climate, craft skills, and local practices.",
    },
  ],
};

const topics = [
  {
    name: "Gurukul",
    symbol: "✦",
    description: "Enter the world of ancient learning",
  },
  {
    name: "Yoga",
    symbol: "ॐ",
    description: "Explore mind, breath, and awareness",
  },
  {
    name: "Ayurveda",
    symbol: "❋",
    description: "Discover traditional health knowledge",
  },
  {
    name: "Architecture",
    symbol: "⌂",
    description: "Decode the wisdom of historic buildings",
  },
];

export default function WisdomVault({ onHome }) {
  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState("intro");
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(60);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (step !== "playing" || reveal) return;

    const timer = setInterval(() => {
      setSeconds((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          setStep("result");
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, reveal]);

  const startGame = (chosenTopic) => {
    const shuffled = [...challenges[chosenTopic]].sort(
      () => Math.random() - 0.5
    );

    setTopic(chosenTopic);
    setQuestions(shuffled);
    setIndex(0);
    setSeconds(60);
    setScore(0);
    setSelected(null);
    setReveal(false);
    setStep("playing");
  };

  const current = questions[index];

  const answerQuestion = (optionIndex) => {
    if (reveal || step !== "playing") return;

    setSelected(optionIndex);
    setReveal(true);

    if (optionIndex === current.answer) {
      setScore((previous) => previous + 100);
    }
  };

  const nextQuestion = () => {
    if (index === questions.length - 1) {
      setStep("result");
      return;
    }

    setIndex((previous) => previous + 1);
    setSelected(null);
    setReveal(false);
  };

  const returnToTopics = () => {
    setStep("intro");
    setTopic(null);
    setQuestions([]);
  };

  const rank =
    score === 300
      ? "Master of Wisdom"
      : score >= 200
      ? "Wisdom Keeper"
      : score >= 100
      ? "Curious Explorer"
      : "Apprentice of Knowledge";

  return (
    <main className="vault-page">
      <header className="vault-topbar">
        <button className="vault-brand" onClick={onHome}>
          <span className="vault-brand-mark">✺</span>
          PARAMPARA
        </button>
        <span className="vault-top-label">THE WISDOM VAULT</span>
        <button className="vault-exit" onClick={onHome}>
          Exit ✕
        </button>
      </header>

      {step === "intro" && (
        <section className="vault-hero">
          <div className="vault-eyebrow">
            AN INTERACTIVE HERITAGE CHALLENGE
          </div>
          <div className="vault-emblem">✺</div>
          <h1>
            The Wisdom
            <br />
            <span>Vault</span>
          </h1>
          <p className="vault-subtitle">
            Ancient knowledge. Hidden clues. One minute.
          </p>
          <p className="vault-description">
            Choose your path, solve three challenges, and unlock
            a piece of India's extraordinary knowledge heritage.
          </p>

          <div className="vault-stats">
            <div>
              <strong>60</strong>
              <span>SECONDS</span>
            </div>
            <div>
              <strong>03</strong>
              <span>CHALLENGES</span>
            </div>
            <div>
              <strong>300</strong>
              <span>MAX POINTS</span>
            </div>
          </div>

          <h2 className="vault-pick-title">CHOOSE YOUR CHALLENGE</h2>

          <div className="vault-topic-grid">
            {topics.map((item) => (
              <button
                className="vault-topic-card"
                key={item.name}
                onClick={() => startGame(item.name)}
              >
                <span className="vault-topic-symbol">{item.symbol}</span>
                <strong>{item.name}</strong>
                <span className="vault-topic-description">
                  {item.description}
                </span>
                <span className="vault-card-arrow">ENTER →</span>
              </button>
            ))}
          </div>

          <p className="vault-bottom-note">
            NO SIGN-UP · JUST CURIOSITY · READY TO PLAY?
          </p>
        </section>
      )}

      {step === "playing" && current && (
        <section className="vault-game">
          <div className="vault-game-heading">
            <div>
              <span className="vault-eyebrow">YOUR CHALLENGE</span>
              <h1>{topic}</h1>
            </div>
            <div
              className={`vault-timer ${
                seconds <= 10 ? "vault-timer-danger" : ""
              }`}
            >
              <span>TIME LEFT</span>
              <strong>00:{String(seconds).padStart(2, "0")}</strong>
            </div>
          </div>

          <div className="vault-progress">
            <div
              style={{
                width: `${((index + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <div className="vault-question-meta">
            <span>CHALLENGE {index + 1} OF {questions.length}</span>
            <span>✦ {score} POINTS</span>
          </div>

          <article className="vault-question-card">
            <div className="vault-question-seal">✺</div>
            <h2>{current.question}</h2>

            <div className="vault-options">
              {current.options.map((option, optionIndex) => {
                let className = "vault-option";

                if (reveal && optionIndex === current.answer) {
                  className += " vault-option-correct";
                } else if (
                  reveal &&
                  optionIndex === selected
                ) {
                  className += " vault-option-wrong";
                }

                return (
                  <button
                    key={option}
                    className={className}
                    onClick={() => answerQuestion(optionIndex)}
                    disabled={reveal}
                  >
                    <span className="vault-option-letter">
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <span>{option}</span>
                    {reveal && optionIndex === current.answer && (
                      <span className="vault-option-check">✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            {reveal && (
              <div className="vault-feedback">
                <strong>
                  {selected === current.answer
                    ? "A clue well uncovered! +100 points"
                    : "The vault reveals its secret"}
                </strong>
                <p>{current.fact}</p>
                <button
                  className="vault-primary-button"
                  onClick={nextQuestion}
                >
                  {index === questions.length - 1
                    ? "REVEAL MY RESULT →"
                    : "NEXT CHALLENGE →"}
                </button>
              </div>
            )}
          </article>

          <p className="vault-bottom-note">
            TRUST YOUR CURIOSITY · LEARN SOMETHING NEW
          </p>
        </section>
      )}

      {step === "result" && (
        <section className="vault-result">
          <div className="vault-result-emblem">
            {seconds > 0 ? "✺" : "⌛"}
          </div>
          <div className="vault-eyebrow">
            {seconds > 0 ? "THE VAULT IS OPEN" : "TIME HAS RUN OUT"}
          </div>
          <h1>
            {seconds > 0 ? "Wisdom Unlocked" : "Challenge Complete"}
          </h1>
          <p className="vault-subtitle">
            Every discovery keeps a tradition alive.
          </p>

          <div className="vault-score-card">
            <span>YOUR FINAL SCORE</span>
            <strong>{score}</strong>
            <span>OUT OF 300 POINTS</span>
            <div className="vault-score-divider" />
            <span>YOUR TITLE</span>
            <h2>{rank}</h2>
            <p>
              {score === 300
                ? "Remarkable! You uncovered every clue."
                : score >= 200
                ? "Impressive work! Your knowledge is shining."
                : score >= 100
                ? "A great start. Keep exploring India's heritage."
                : "Every great journey begins with curiosity."}
            </p>
          </div>

          <div className="vault-result-actions">
            <button
              className="vault-primary-button"
              onClick={() => startGame(topic)}
            >
              PLAY AGAIN ↻
            </button>
            <button
              className="vault-secondary-button"
              onClick={returnToTopics}
            >
              TRY ANOTHER PATH
            </button>
          </div>

          <p className="vault-bottom-note">
            PARAMPARA · KNOWLEDGE PASSED THROUGH GENERATIONS
          </p>
        </section>
      )}
    </main>
  );
}
