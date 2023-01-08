import { css } from 'styled-components'

export const ContentEditable = css`
    -webkit-user-modify: read-write;
    -moz-user-modify: read-write;
    user-modify: read-write;
    border: 0; 
    outline: 0;
`;

export const ProhibitSelectText = css`
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently */
`
