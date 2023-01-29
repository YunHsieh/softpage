import styled from 'styled-components'
import { ContentEditable, ProhibitSelectText } from './common'

export const TopContainer = styled.div`
    color: #f5f5f5;
    display: flex;
`

export const MainPageContainer = styled.div`
    position: relative;
    background-color: #1a1a1a;
    overflow-y: scroll;
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const EssayContainer = styled.div`
    margin-left: 10%;
    margin-right: 10%;
    padding-top: 14px;
    padding-bottom: 25px;
`

export const TagContainer = styled.div`
    ${ContentEditable}
    border-bottom: 1.5px solid #8b8c8e;
    color: #8b8c8e;
`

export const TitleContainer = styled.div`
    ${ContentEditable}
    margin-top: 20px;
    font-weight: bold;
    font-size: 32px;
    border-bottom: 1.5px solid #8b8c8e;
`

export const CompareEssayContainer = styled.div<{isParsed?: boolean, isCompared?: boolean, isRight?: boolean}>`
    ${props => (props.isRight || props.isParsed || props.isCompared ? '': ContentEditable)};
    margin-top: 20px;
    font-size: 24px;
    min-height: 65vh;
    white-space: pre-wrap;
    width: ${props => (props.isCompared ? "50%" : "100%")};
    border-left: ${props => (props.isRight ? "1px solid #8b8c8e" : "0px")};
    padding-left: ${props => (props.isRight ? "10px" : "5px")};
    padding-right: ${props => (props.isRight ? "5px" : "10px")};
`

export const EachSentences = styled.div`
    ${ContentEditable};
    border: 1px solid #8b8c8e;
    border-radius: 10px;
    min-height: 40px;
    margin: 10px auto;
    padding-left: 10px;
`

export const ComparedEssaysContainer = styled.div`
    ${ProhibitSelectText};
    padding-top: 15px;
    width: 100%;
    cursor: pointer;
    transition: all .3s;
    &:hover {
        transform: scale(0.95);
        opacity: 0.3;
    }
`

export const ComparedEssaysCard = styled.div`
    background-color: #464646;
    padding-left: 10px;
    border-radius: 15px;
    font-size: 14px;
`

export const RemaindWords = styled.div`
    text-decoration-line: line-through;
    color: gray;
    display: inline;
    white-space: pre-wrap;
`

export const EditorRecommandedWords = styled.div`
    color: #E1D400;
    display: inline;
    white-space: pre-wrap;
`