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
    const location = useLocation();
    const category = new URLSearchParams(location.search).get('category');
    const difficulty = new URLSearchParams(location.search).get('difficulty');

    useEffect(() => {
        fetch(
            `https://quizapi.io/api/v1/questions?apiKey=yCQVhQnw6eDgar42ge03acAhwuc12x0OIvcVCJJy&category=${category}&difficulty=${difficulty}`
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
       return (
        <div>
            {questions.length}
        </div>
    
       )      
}
