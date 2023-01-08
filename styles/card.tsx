import styled, { css } from 'styled-components'
import { ProhibitSelectText } from 'styles/common'

export const TriggerBehavior = css`
    white-space: nowrap;
    color: white;
    cursor: pointer;
    &:last-child {
        padding-bottom: 0;
    }
    &:hover {
        background-color: #464646;
    }
    border-radius: 15px;
`

export const EachCardEdge = styled.div`
    padding-top: 1vh;
    padding-right: .5vh;
    padding-left: .5vh;
    ${TriggerBehavior}
    ${ProhibitSelectText}
`

export const TextContainerInBar = styled.div<{selected?: boolean}>`
    padding: 5px;
    padding-right: 0.5vh;
    padding-top: 1vh;
    padding-left: 1.5vh;
    ${TriggerBehavior}
    ${ProhibitSelectText}
    background-color: ${props => (props.selected ? '#464646' : '#282828')};;
`

export const TextContainerInBarSelected = styled(TextContainerInBar)`
    background-color: #464646;
`

export const TextInNavBar = styled.div`
    font-size: 22px;
    overflow: hidden;
    white-space: nowrap; /* Don't forget this one */
`
