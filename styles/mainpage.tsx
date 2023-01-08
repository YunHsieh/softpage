import styled from 'styled-components'
import { ContentEditable } from './common'

export const TopContainer = styled.div`
    ${ContentEditable}
    color: #f5f5f5;
    margin-left: 20%;
    margin-right: 20%;
    padding-top: 14px;
`

export const MainContainer = styled.div`
    position: relative;
    background-color: #1a1a1a;
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const TagContainer = styled(TopContainer)`
    border-bottom: 1.5px solid #8b8c8e;
    color: #8b8c8e;
`

export const TitleContainer = styled(TopContainer)`
    margin-top: 20px;
    font-weight: bold;
    font-size: 48px;
    border-bottom: 1.5px solid #8b8c8e;
`

export const ContentContainer = styled(TopContainer)`
    margin-top: 20px;
    height: 100%;
    white-space: pre-wrap;
`
