import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #ffffff;
}
`;

export const StyledApp = styled.div`
    padding: 1rem;
    background-color: #1d1f27;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.div`
    margin-top: 1rem;
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.button`
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: purple;
        color: #ffffff;
    }
`;
