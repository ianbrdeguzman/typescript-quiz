import Form from './components/Form';
import QuestionCard from './components/QuestionCard';
import { GlobalStyle, StyledApp, Container, Button } from './App.styles';
import { useApp } from './context/AppContext';

const App: React.FC = () => {
    const state = useApp();

    const resetQuiz = () => {
        state?.dispatch({ type: 'RESET_QUIZ' });
    };

    return (
        <>
            <GlobalStyle />
            <StyledApp>
                <h1>Typescript Quiz</h1>
                <h3>Powered by Open Trivia DB</h3>
                <Container>
                    {!state?.state.start && state?.state.gameOver && <Form />}
                    {state?.state.start && !state?.state.gameOver && (
                        <p>Score: {state?.state.score}</p>
                    )}
                    {state?.state.start && state?.state.gameOver && (
                        <p>
                            Your final score: {state?.state.score}/
                            {state?.state.questions.length}
                        </p>
                    )}
                    {state?.state.start && !state?.state.gameOver && (
                        <QuestionCard />
                    )}
                    {state?.state.start && state?.state.gameOver && (
                        <Button onClick={resetQuiz}>Try again</Button>
                    )}
                </Container>
            </StyledApp>
        </>
    );
};

export default App;
