import styled from 'styled-components'


export const LeftBar = styled.div<{isHover?: boolean}>`
    position: fixed;
    background-color: #D3D3D3;
    height: 100%;
    max-width: ${props => (props.isHover ? "25%" : "50px")};
    transition: all 0.3s;
`;

export const ContentEdge = styled.div`
    margin-top: 100px;
`
