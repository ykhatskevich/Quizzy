import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");
  const difficulty = new URLSearchParams(location.search).get("difficulty");

  useEffect(() => {
    setIsLoading(true);
      
    fetch(
      `https://quizapi.io/api/v1/questions?apiKey=yCQVhQnw6eDgar42ge03acAhwuc12x0OIvcVCJJy&category=${category}&difficulty=${difficulty}&limit=20`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setQuestions(data);
        setIsLoading(false);

        if (Array.isArray(data) && data.length === 0) {
          console.warn("API returned an empty array.");
        } else {
          setQuestions(data);

          if (data.length > 0) {
            setTotalQuestionsCount(data.length);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setIsLoading(false);
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

        if (isCorrect) {
          setCorrectAnswersCount(correctAnswersCount + 1);
        }
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
    } else {
      if (currentQuestionIndex === questions.length - 1) {
        setTotalQuestionsCount(totalQuestionsCount + questions.length);
      }
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0); // Reset the current question index to the first question.
    setSelectedAnswer(null); // Reset the selected answer.
    setIsAnswerSubmitted(false); // Reset the answer submission state.
    setIsAnswerCorrect(false); // Reset the answer correctness state.
    setCorrectAnswersCount(0); // Reset the correct answers count.
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {isLoading ? (
      <p className="text-xl text-teal-300" style={{fontFamily:"IBM PLEX MONO, monospace"}}>Loading...</p>
    ) : (
      currentQuestion && (
        <div className="text-center max-w-lg">
          <Link to="/">
          <button className="text-xl text-teal-300 cursor-pointer hover:text-teal-100 transition-colors mb-4 p-3 border border-teal-300 hover:border-teal-100 rounded-lg" style={{fontFamily:"IBM PLEX MONO, monospace"}}>Back to Home Page</button>
          </Link>
          <h3
            className="text-3xl text-indigo-400 mb-5 p-3 border border-indigo-200 rounded-lg"
            style={{ fontFamily: "IBM PLEX MONO, monospace" }}
          >
            {currentQuestion.question}
          </h3>
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
                          ? "text-green-500 text-2xl" 
                          : "text-red-500 text-2xl" 
                        : "text-slate-300 text-2xl" 
                    } cursor-pointer border-b mb-7 hover:text-teal-100`}
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
                  <p className="text-3xl text-green-500 font-semibold">
                    Correct!
                  </p>
                ) : (
                  <p className="text-xl text-indigo-200">
                    <span className="text-3xl text-red-500 font-semibold">
                      Incorrect!
                    </span>{" "}
                    The correct answer is{" "}
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
                <button
                  onClick={handleNextQuestion}
                  className="text-3xl text-teal-400 mt-4 p-3 border border-teal-300 rounded-lg hover:border-teal-100 hover:text-teal-100 transition-colors"
                >
                  Next Question
                </button>
              ) : (
                <div>
                  <p className="text-4xl text-green-300">
                    Quiz Complete! Correct answers:{correctAnswersCount}/
                    {totalQuestionsCount}
                  </p>
                  <button
                    onClick={handleTryAgain}
                    className="text-2xl text-teal-400 mt-4 p-3 border border-teal-300 rounded-lg hover:border-teal-100 hover:text-teal-100 transition-colors"
                  >
                    Try again!
                  </button>
                  <Link to="/">
                    <button className="text-2xl text-teal-400 mt-4 ml-4 p-3 border border-teal-300 rounded-lg hover:border-teal-100 hover:text-teal-100 transition-colors">
                      Back to Home Page
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
          {!isAnswerSubmitted && selectedAnswer && (
            <button onClick={handleSubmitAnswer}>Submit Answer</button>
          )}
        </div>
    )
      )}
    </div>
  );
}
