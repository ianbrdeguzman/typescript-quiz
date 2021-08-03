import React from 'react'
import { Answer } from '../App'

export interface IProps {
    question: string;
    questionNumber: number;
    totalQuestion: number;
    answers: string[];
    userAnswer: Answer | undefined;
    callback: any;
}

const QuestionCard: React.FC<IProps> = ({question, questionNumber, totalQuestion, answers, userAnswer, callback}) => {
    return (
        <div>
            <p>{questionNumber} / {totalQuestion}</p>
            <p dangerouslySetInnerHTML={{ __html: question }}></p>
            {answers.map(answer => (
                <div key={answer}>
                    <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>{answer}</button> <br />
                </div>
            ))}
        </div>
    )
}

export default QuestionCard;
