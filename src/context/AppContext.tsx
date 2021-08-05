import { createContext, useContext, useReducer } from 'react';

interface NewQuestion {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
    answers: string[];
}

interface Answer {
    question: string | undefined;
    answer: string;
    correct: boolean;
    correctAnswer: string | undefined;
}

interface State {
    number: number;
    score: number;
    start: boolean;
    gameOver: boolean;
    userAnswer: Answer[];
    questions: NewQuestion[];
}

type Action =
    | { type: 'CORRECT_ANSWER'; payload: Answer }
    | { type: 'INCORRECT_ANSWER'; payload: Answer }
    | { type: 'NEXT_QUESTION' }
    | { type: 'GAME_OVER' }
    | { type: 'RESET_QUIZ' }
    | { type: 'GET_QUESTIONS'; payload: NewQuestion[] };

type Dispatch = (action: Action) => void;

const AppContext = createContext<
    { state: State; dispatch: Dispatch } | undefined
>(undefined);

const initialState = {
    number: 0,
    score: 0,
    start: false,
    gameOver: true,
    userAnswer: [],
    questions: [],
};

const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case 'CORRECT_ANSWER':
            return {
                ...state,
                score: state.score + 1,
                userAnswer: [...state.userAnswer, action.payload],
            };
        case 'INCORRECT_ANSWER':
            return {
                ...state,
                userAnswer: [...state.userAnswer, action.payload],
            };
        case 'NEXT_QUESTION':
            return {
                ...state,
                number: state.number + 1,
            };
        case 'GAME_OVER':
            return {
                ...state,
                gameOver: true,
            };
        case 'RESET_QUIZ':
            return {
                ...state,
                number: 0,
                score: 0,
                start: false,
                gameOver: true,
                questions: [],
                userAnswers: [],
            };
        case 'GET_QUESTIONS':
            return {
                ...state,
                questions: action.payload,
                gameOver: false,
                start: true,
            };
        default:
            return { ...state };
    }
};

export const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    return useContext(AppContext);
};
