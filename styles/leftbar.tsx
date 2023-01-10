import styled from 'styled-components'


export const LeftBar = styled.div<{isHover?: boolean}>`
    position: relative;
    background-color: #282828;
    min-height: 100vh;
    overflow-y: scroll;
    min-width: 7vh;
    max-width: ${props => (props.isHover ? "15%" : "50px")};
    transition: all ${props => (props.isHover ? "1s" : ".1s")};
`;

export const ContentEdge = styled.div`
    margin-top: 100px;
`
