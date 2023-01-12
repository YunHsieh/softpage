import styled from 'styled-components'
import Image from 'next/image';
import { ProhibitSelectText } from './common';

export const ToolsContainer = styled.div`
    position: fixed;
    transform: translate(-100px);
    top: 15vh;
    width: 100px;
    height: 900px;
    cursor: pointer;
    transition: all .5s;
`

export const GadgetContainer = styled.div`;
    margin: 15px auto;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    &:hover {
        transform: scale(1.5);
        opacity: 0.3;
    }
    transition: all .5s;
    opacity: 0.7;
    background-color: #454545;
`

export const GadgetItems = styled.div`
    ${ProhibitSelectText}
    color: #f5f5f5;
    font-size: 30px;
    margin: auto;
    text-align: center;
`

export const MyIcon = styled(Image)<{img?: any}>`
    ${ProhibitSelectText}
    height: 100%;
    width: 100%;
    transform: scale(.7);
    filter: invert(100%);
`;
