import React, { useState } from 'react'
import { Dispatch } from "react";
import { NewQuestion } from '../App';
import { shuffleArray } from '../util';

interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

interface IState {
    amount: string;
    difficulty: string;
    type: string;
}

interface IProps {
    setQuestions: Dispatch<NewQuestion[]>;
    setStart: Dispatch<boolean>;
    setGameOver: Dispatch<boolean>;
}

const Form: React.FC<IProps> = ({setQuestions, setStart, setGameOver}) => {
    const [input, setInput] = useState<IState>({
        amount: '10',
        difficulty: 'easy',
        type: 'multiple',
    });

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): void => {
        const {name, value} = e.target;

        setInput(input => ({
                ...input,
                [name]: value
            }));
    }

    const handleOnSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const url = `https://opentdb.com/api.php?amount=${input.amount}&difficulty=${input.difficulty}&type=${input.type}`

        const response = await fetch(url);
        const data = await response.json();

        const questions = data.results.map((question: Question) => {
            return {
                ...question,
                answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
            }
        })
        
        setQuestions(questions);
        setGameOver(false);
        setStart(true);
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <input type="number" name="number" id="number" placeholder='Number of questions' min='1' max='10' value={input.amount} onChange={handleOnChange}/><br/>
            <select name="difficulty" id="difficulty" value={input.difficulty}  onChange={handleOnChange}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select><br/>
            <select name="type" id="type" value={input.type}  onChange={handleOnChange}>
                <option value="boolean">True / False</option>
                <option value="multiple">Multiple Choice</option>
            </select><br/>
        <button type="submit">Start</button>
      </form>
    )
}

export default Form
