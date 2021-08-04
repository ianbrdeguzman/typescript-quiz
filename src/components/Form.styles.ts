import styled from 'styled-components';

export const StyledForm = styled.form`
    margin-top: 1rem;
    background-color: rebeccapurple;
    padding: 1rem;
    border-radius: 0.2rem;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    div {
        & input {
            width: 100%;
            padding: 5px;
            outline: none;
            margin-bottom: 0.5rem;
        }
        & select {
            width: 100%;
            padding: 5px;
            margin-bottom: 0.5rem;
        }
    }
    & button {
        display: block;
        width: 100%;
        margin: 0.5rem auto 0 auto;
        padding: 5px;
        cursor: pointer;
        border: none;
        &:hover {
            background-color: purple;
            color: #ffffff;
        }
    }
`;
