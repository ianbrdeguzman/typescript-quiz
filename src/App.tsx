import { useState } from "react";
import Form from "./components/Form";
import QuestionCard from "./components/QuestionCard";

export interface NewQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
  answers: string[];
}

export interface Answer {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const App: React.FC = () => {
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [userAnswer, setUserAnswer] = useState<Answer[]>([]);
  const [questions, setQuestions] = useState<NewQuestion[]>([])

   const checkAnswer = (e: any) => {
    if (!gameOver) {

      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore(score + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswer([...userAnswer, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === questions.length) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const restart = () => {
    setNumber(0);
    setScore(0);
    setStart(false);
    setGameOver(true);
    setQuestions([]);
    setUserAnswer([])
  }

  return (
    <div>
      <h1>Typescript Quiz</h1>
      <h3>Powered by Open Trivia DB</h3>
      {!start && gameOver && <Form setQuestions={setQuestions} setStart={setStart} setGameOver={setGameOver}/>}
      {start && <p>Score: {score}</p>}
      {start && !gameOver && (
        <QuestionCard 
          question={questions[number].question}
          questionNumber={number + 1}
          totalQuestion={questions.length}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {start && !gameOver && <button onClick={nextQuestion}>Next</button>}
      {start && gameOver && userAnswer.length === questions.length && <button onClick={restart}>Restart</button>}
    </div>
  );
}

export default App;