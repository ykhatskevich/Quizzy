import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); //keeps track of which question is currently being displayed
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false); // keeps track of whether the user has submitted an answer
    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category');
    const difficulty = new URLSearchParams(location.search).get('difficulty');

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

       const currentQuestion = questions[currentQuestionIndex]; //current question being displayed

       const handleAnswerSelection = (selectedOption: string) => {
        if (!isAnswerSubmitted) {
          setSelectedAnswer(selectedOption);   //if the user has not submitted an answer, then set the selected answer to the option that the user clicked on
        }
      };

      const handleSubmitAnswer = () => {
        setIsAnswerSubmitted(true);
      } //when the user clicks on the submit button, set isAnswerSubmitted to true

      // eslint-disable-next-line no-unused-vars
      const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);

        //move to the next question if there is one
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      };

       return (
        <div>
      {currentQuestion && (
        <div>
          <h3>{currentQuestion.question}</h3>
          <ul>
            {Object.entries(currentQuestion.answers).map(([option, text]) => {
              // Check if the text is not null and not empty
              if (text) {
                return (
                  <li
                    key={option}
                    onClick={() => handleAnswerSelection(option)}
                    className={`${
                      isAnswerSubmitted
                        ? (currentQuestion.correct_answers as Record<string, boolean>)[`${option}_correct`]
                        : ""
                    }`}
                  >
                    {text}
                  </li>
                );
              } else {
                return null; // Skip rendering if answer text is empty
              }
            })}
          </ul>
          {isAnswerSubmitted && (
            <div>
              {selectedAnswer &&
    (currentQuestion.correct_answers as Record<string, boolean>)[
      `${selectedAnswer}_correct`
    ] ? (
      <p>Correct!</p>
    ) : (
      <p>
        Incorrect. The correct answer is{" "}
        {Object.entries(currentQuestion.correct_answers)
        /* eslint-disable no-unused-vars */
          .filter(([_, value]) => value)
          .map(([key]) => key)
          .join(", ")}
      </p>
    )}
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
    
       )      
}
