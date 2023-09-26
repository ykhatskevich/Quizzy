import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  description: string;
  answers: {
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    answer_e: string | null;
    answer_f: string | null;
  };
  multiple_correct_answers: boolean;
  correct_answers: {
    answer_a_correct: boolean;
    answer_b_correct: boolean;
    answer_c_correct: boolean;
    answer_d_correct: boolean;
    answer_e_correct: boolean;
    answer_f_correct: boolean;
  };
  explanation: string;
  tip: string | null;
  tags: string[];
  category: string;
  difficulty: string;
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");
  const difficulty = new URLSearchParams(location.search).get("difficulty");

  useEffect(() => {
    fetch(
      `https://quizapi.io/api/v1/questions?apiKey=yCQVhQnw6eDgar42ge03acAhwuc12x0OIvcVCJJy&category=${category}&difficulty=${difficulty}&limit=20`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setQuestions(data);

        if (Array.isArray(data) && data.length === 0) {
          console.warn("API returned an empty array.");
        } else {
          setQuestions(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [category, difficulty]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelection = (selectedOption: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(selectedOption);

      // Check if the value is 'true'
      const isCorrect =
        currentQuestion.correct_answers[selectedOption + "_correct"] ===
          "true" ||
        currentQuestion.correct_answers[selectedOption + "_correct"] === true;

      if (isCorrect !== undefined) {
        setIsAnswerCorrect(isCorrect);
        setIsAnswerSubmitted(true);
      }
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      setIsAnswerSubmitted(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {currentQuestion && (
        <div className="text-center max-w-lg">
          <h3 className="text-3xl text-indigo-300"
            style={{ fontFamily: "IBM PLEX MONO, monospace" }}>{currentQuestion.question}</h3>
          <ul>
            {Object.entries(currentQuestion.answers).map(([option, text]) => {
              if (text) {
                return (
                  <li
                    key={option}
                    onClick={() => handleAnswerSelection(option)}
                    className={`${
                      isAnswerSubmitted && selectedAnswer === option
                        ? isAnswerCorrect
                          ? "correct-answer"
                          : "incorrect-answer"
                        : ""
                    }`}
                  >
                    {text}
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
          {isAnswerSubmitted && (
            <div>
              {selectedAnswer &&
                (isAnswerCorrect ? (
                  <p>Correct!</p>
                ) : (
                  <p>
                    Incorrect. The correct answer is{" "}
                    {Object.entries(currentQuestion.answers)
                      .filter(
                        ([key]) =>
                          currentQuestion.correct_answers[key + "_correct"] ===
                          "true"
                      )
                      .map(([key, value]) => value)
                      .join(", ")}
                  </p>
                ))}
              {currentQuestionIndex < questions.length - 1 ? (
                <button onClick={handleNextQuestion}>Next Question</button>
              ) : (
                <p>Quiz Complete!</p>
              )}
            </div>
          )}
          {!isAnswerSubmitted && selectedAnswer && (
            <button onClick={handleSubmitAnswer}>Submit Answer</button>
          )}
        </div>
      )}
    </div>
  );
}
