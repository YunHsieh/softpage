import styled from 'styled-components'
import { ContentEditable } from './common'

export const TopContainer = styled.div`
    ${ContentEditable}
    margin-left: 20%;
    margin-right: 20%;
    padding-top: 14px;
`

export const MainContainer = styled.div`
    position: relative;
    overflow-y: scroll;
    width: 100%;
    display: flex;
    flex-direction: column;
`

export const TagContainer = styled(TopContainer)`
    border-bottom: 1.5px solid #ddd;
    color: #999;
`

export const TitleContainer = styled(TopContainer)`
    margin-top: 20px;
    font-weight: bold;
    font-size: 48px;
    border-bottom: 1.5px solid #ddd;
`

export const ContentContainer = styled(TopContainer)`
    margin-top: 20px;
    height: 100%;
`
