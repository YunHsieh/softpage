import { CardContent,  styled as muiStyled } from '@mui/material';
import styled from 'styled-components'


export const CardContentNoPadding = muiStyled(CardContent)(`
    padding: 5px;
    padding-right: 3vh;
    padding-left: 1.5vh;
    background-color: #505050;
    color: white;
    cursor: pointer;
    &:last-child {
        padding-bottom: 0;
    }
    &:hover {
        background-color: #464646;
    }
    border-radius: 15px;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
`);

export const EachCardEdge = styled.div`
    padding-top: 2vh;
    padding-right: 1.5vh;
    padding-left: 1.5vh;
`
