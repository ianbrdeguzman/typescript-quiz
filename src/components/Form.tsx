import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { shuffleArray } from '../util';
import { StyledForm } from './Form.styles';

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

const Form: React.FC = () => {
    const state = useApp();
    const [input, setInput] = useState<IState>({
        amount: '10',
        difficulty: 'easy',
        type: 'multiple',
    });

    const handleOnChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ): void => {
        const { name, value } = e.target;

        setInput((input) => ({
            ...input,
            [name]: value,
        }));
    };

    const handleOnSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const url = `https://opentdb.com/api.php?amount=${input.amount}&difficulty=${input.difficulty}&type=${input.type}`;

        const response = await fetch(url);
        const data = await response.json();

        const questions = data.results.map((question: Question) => {
            return {
                ...question,
                answers: shuffleArray([
                    ...question.incorrect_answers,
                    question.correct_answer,
                ]),
            };
        });

        state?.dispatch({ type: 'GET_QUESTIONS', payload: questions });
    };

    return (
        <StyledForm onSubmit={handleOnSubmit}>
            <div>
                <label htmlFor='amount'>Number of questions</label>
                <input
                    type='number'
                    name='amount'
                    id='amount'
                    placeholder='Number of questions'
                    min='1'
                    max='10'
                    value={input.amount}
                    onChange={handleOnChange}
                />
                <label htmlFor='difficulty'>Difficulty</label>
                <select
                    name='difficulty'
                    id='difficulty'
                    value={input.difficulty}
                    onChange={handleOnChange}
                >
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </select>
                <label htmlFor='type'>Type</label>
                <select
                    name='type'
                    id='type'
                    value={input.type}
                    onChange={handleOnChange}
                >
                    <option value='boolean'>True / False</option>
                    <option value='multiple'>Multiple Choice</option>
                </select>
            </div>
            <button type='submit'>Start</button>
        </StyledForm>
    );
};

export default Form;
