import styled from 'styled-components';
import Image from 'next/image';
import { ProhibitSelectText } from './common';


export const BgMaskContainer = styled.div`
    position: absolute;
    background-color: rgba(0,0,0, 0.7);
    width: 100%;
    height: 100%;
`

export const LoginsContainer = styled.div`
    position: absolute;
    margin: auto;
    width: 450px;
    height: 160px;
    background-color: #282828;
    border-radius: 15px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`

export const LoginBox = styled.div`
    ${ProhibitSelectText};
    width: 100%;
    position: absolute;
    padding: 15px 50px;
`

export const LoginTitle = styled.div`
    -webkit-text-stroke: 2px white;
    height: 50px;
    font-size: 28px;
    text-align: center;
    border-bottom: 1.5px solid #8b8c8e;
`;

export const LoginBg = styled.div`
    background-color: white;
    color: black;
    height: 40px;
    margin-top: 20px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
`

export const LoginImg = styled(Image)`
    width : auto;
    height: 30px;
`;
