import styled from 'styled-components';

export const StyledQuestionCard = styled.article`
    margin-top: 1rem;
    background-color: rebeccapurple;
    width: 100%;
    max-width: 400px;
    min-height: 400px;
    padding: 1rem;
    text-align: center;
    border-radius: 0.2rem;
    display: flex;
    flex-direction: column;
    div {
        margin-top: 1rem;
        & p {
            margin-bottom: 1rem;
        }

        & button {
            width: 100%;
            padding: 5px;
            margin-bottom: 0.5rem;
            cursor: pointer;
        }
    }
`;

export const StyledMain = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & div {
        flex: 1;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 5px;
    margin-top: 0.5rem;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: purple;
        color: #ffffff;
    }
`;
