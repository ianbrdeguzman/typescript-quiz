import React from 'react';
import { Answer } from '../App';
import { StyledQuestionCard, StyledMain, Button } from './QuestionCard.styles';

export interface IProps {
    question: string;
    questionNumber: number;
    totalQuestion: number;
    answers: string[];
    userAnswer: Answer | undefined;
    start: boolean;
    gameOver: boolean;
    checkAnswer: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    nextQuestion: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const QuestionCard: React.FC<IProps> = ({
    question,
    questionNumber,
    totalQuestion,
    answers,
    userAnswer,
    start,
    gameOver,
    checkAnswer,
    nextQuestion,
}) => {
    return (
        <StyledQuestionCard>
            <p>
                Question {questionNumber} of {totalQuestion}
            </p>
            <StyledMain>
                <div>
                    <p dangerouslySetInnerHTML={{ __html: question }}></p>
                    {answers.map((answer) => (
                        <button
                            key={answer}
                            disabled={userAnswer ? true : false}
                            value={answer}
                            onClick={checkAnswer}
                            dangerouslySetInnerHTML={{ __html: answer }}
                        />
                    ))}
                </div>
                {start && !gameOver && (
                    <Button onClick={nextQuestion}>Next</Button>
                )}
            </StyledMain>
        </StyledQuestionCard>
    );
};

export default QuestionCard;
