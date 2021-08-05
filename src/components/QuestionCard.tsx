import React from 'react';
import { useApp } from '../context/AppContext';
import { StyledQuestionCard, StyledMain, Button } from './QuestionCard.styles';

const QuestionCard: React.FC = () => {
    const state = useApp();

    const handleAnswerOnClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        if (!state?.state.gameOver) {
            const answer = e.currentTarget.value;
            const correct =
                state?.state.questions[state?.state.number].correct_answer ===
                answer;

            const answerObject = {
                question: state?.state.questions[state.state.number].question,
                answer,
                correct,
                correctAnswer:
                    state?.state.questions[state?.state.number].correct_answer,
            };

            if (correct) {
                state?.dispatch({
                    type: 'CORRECT_ANSWER',
                    payload: answerObject,
                });
            } else {
                state?.dispatch({
                    type: 'INCORRECT_ANSWER',
                    payload: answerObject,
                });
            }
        }
    };

    const handleNextQuestion = () => {
        if (
            (state && state?.state.number + 1) === state?.state.questions.length
        ) {
            state?.dispatch({ type: 'GAME_OVER' });
        } else if (
            state?.state.userAnswer.length ===
            (state && state?.state.number + 1)
        ) {
            state?.dispatch({
                type: 'NEXT_QUESTION',
            });
        }
    };

    return (
        <StyledQuestionCard>
            <p>
                Question {state?.state.number && state?.state.number + 1} of{' '}
                {state?.state.questions.length}
            </p>
            <StyledMain>
                <div>
                    {state && (
                        <p
                            dangerouslySetInnerHTML={{
                                __html: state.state.questions[
                                    state.state.number
                                ].question,
                            }}
                        ></p>
                    )}
                    {state?.state.questions[state.state.number].answers.map(
                        (answer) => (
                            <button
                                key={answer}
                                disabled={
                                    state?.state.userAnswer.length ===
                                    state.state.number + 1
                                        ? true
                                        : false
                                }
                                value={answer}
                                onClick={handleAnswerOnClick}
                                dangerouslySetInnerHTML={{ __html: answer }}
                            />
                        )
                    )}
                </div>
                {state?.state.start && !state?.state.gameOver && (
                    <Button onClick={handleNextQuestion}>Next</Button>
                )}
            </StyledMain>
        </StyledQuestionCard>
    );
};

export default QuestionCard;
