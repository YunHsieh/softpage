import styled from 'styled-components'


export const LeftBar = styled.div<{isHover?: boolean}>`
    position: relative;
    background-color: #282828;
    min-height: 100vh;
    overflow-y: hidden;
    min-width: 10vh;
    max-width: ${props => (props.isHover ? "25%" : "50px")};
    transition: all ${props => (props.isHover ? "2s" : "0s")};
`;

export const ContentEdge = styled.div`
    margin-top: 100px;
`
