import styled from 'styled-components'


export const LeftBar = styled.div<{isHover?: boolean}>`
    position: relative;
    background-color: #D3D3D3;
    min-height: 100vh;
    overflow-y: hidden;
    min-width: 45px;
    max-width: ${props => (props.isHover ? "25%" : "50px")};
    transition: all 0.5s;
`;

export const ContentEdge = styled.div`
    margin-top: 100px;
`
