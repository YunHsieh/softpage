import styled, { createGlobalStyle } from 'styled-components'


export const Container = styled.div`
    position: relative;
    color: wheat;
    background: #212125;
    height: 100vh;
    box-sizing: border-box;
`;

export const ContentInput = styled.div`
    position: relative;
    padding-left: 12px;
    white-space: pre-line;
    padding-top: 5px;
    height: 100vh;
    border: 0; 
    outline: 0; 
`;


export const GlobalStyle = createGlobalStyle`
    body {
        // background: #212125;
        color: white;
    }
`
