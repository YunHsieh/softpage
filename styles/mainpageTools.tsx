import styled from 'styled-components'
import Image from 'next/image';
import { ContentEditable, ProhibitSelectText } from './common';

export const GadgetsContainer = styled.div`
    position: fixed;
    transform: translate(-70px);
    top: 15vh;
    display: flex;
    transition: all .5s;
`

export const GadgetComponents = styled.div`
    cursor: pointer;
    transition: all .5s;
`

export const GadgetUnit = styled.div`;
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

export const SavedContainer = styled.div`
    height: 200px;
    width: 300px;
    margin-top: 15px;
    margin-left: 10px;
    border-radius: 15px;
    background-color: #383838;
`

export const SavedInnerCommponets = styled.div`
    white-space: nowrap;
    width: 90%;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0.6;
    padding-top: 3px;
    background-color: #6a6a6a;
    border-radius: 10px;
`

export const SavedCommentText = styled(SavedInnerCommponets)`
    ${ContentEditable};
    height: 15%;
    padding-left: 10px;
`

export const SavedDescText = styled(SavedInnerCommponets)`
    ${ContentEditable};
    height: 55%;
    padding-left: 10px;
`

export const SavedButton = styled(SavedInnerCommponets)`
    margin-top: 5px;
    height: 15%;
    cursor: pointer;
    background-color: #40a85e;
    text-align: center;
    &:hover {
        transform: scale(.95);
    }
`
