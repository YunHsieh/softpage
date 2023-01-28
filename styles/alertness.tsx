import styled from 'styled-components'
import { ProhibitSelectText } from './common';

const promptLevel = {
    info: '#357a41',
    warning: '#f2cc00',
    warn: '#f2cc00',
    error: '#FF3737',
}

export const AlertContainer = styled.div<{level?: string}>`
    position: absolute;
    bottom: 5vh;
    right: 5vh;
    width: 300px;
    border-radius: 10px;
    background-color: ${props => (promptLevel[props.level] || '#357a41')};
    color: #f5f5f5;
    font-weight:bolder;
    ${ProhibitSelectText};
`;

export const AlertTitleStyle = styled.div`
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 22px;
    text-align: center;
    margin: auto;
    width: 80%;
`;

export const AlertTitleContentStyle = styled.div`
    margin: auto;
    width: 80%;
    text-align: center;
    font-size: 14px;
`;
