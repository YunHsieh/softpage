import React from 'react';
import { Card, CardContent, Typography, styled } from '@mui/material';
import { EachCardEdge } from '../../styles/card'

const CardContentNoPadding = styled(CardContent)(`
  padding: 5px;
  &:last-child {
    padding-bottom: 0;
  }
`);

const CardNoSelect = styled(Card)`
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
`;

type tplotOptions = {
    [key: string]: string
}

interface CardProps {
    isHover: any;
}

interface CardState {
    data: tplotOptions
}

interface TabPanelProps {
    isHover: any;
    content: string;
}


function HoverWord(props: TabPanelProps) {
    const { isHover, content, ...other } = props;
    const CardWordsShow = 7;
    return (
        <Typography variant="h4" component="div">
            {props.isHover ? (
                Array.from(content).length < CardWordsShow ? (
                    content
                ) : (
                    `${content.substring(0, CardWordsShow)}...`
                )
            ) : (
                content.substring(0, 1)
            )}
        </Typography>
    );
}


class LeftSideCard extends React.Component<CardProps, CardState> {

    constructor(props: CardProps) {
        super(props);
        
        this.state = {
            data: {
                'a': 'H',
                'b': 'hahahhahahha',
                'b3': 'hahahhahahha',
                'b2': 'hahahhahahha',
                'b1': 'hahahhahahha',
                'b44': 'hahahhahahha',
                'b444': 'hahahhahahha',
                'b4444': 'hahahhahahha',
                'b11': 'hahahhahahha',
                'b111': 'hahahhahahha',
                'b1111': 'hahahhahahha',
                'b8': 'hahahhahahha',
                'b22': 'hahahhahahha',
                'b222': 'hahahhahahha',
                'b2222': 'hahahhahahha',
                'b5': 'hahahhahahha',
            }
        };
    }

    onClick = () => console.log('123');

    render() {
      return (
        <div>
            {Object.keys(this.state.data).map((x, i) => 
                <EachCardEdge key={x}>
                    <CardNoSelect
                        onClick={this.onClick}
                    >
                        <CardContentNoPadding> 
                            <HoverWord isHover={this.props.isHover} content={Object(this.state.data)[x]}></HoverWord>
                            <Typography 
                                variant="h4" 
                                component="div" 
                            >
                            </Typography>
                        </CardContentNoPadding>
                    </CardNoSelect>
                </EachCardEdge>
            )}
        </div>
      )
    }
  }

export default LeftSideCard;
