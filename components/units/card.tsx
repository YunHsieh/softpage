import React from 'react';
import { Card, CardContent, Typography, styled } from '@mui/material';
import { EachCardEdge } from 'styles/card'
import { connect } from 'react-redux';
import { setEssayState } from 'stores/softEssay';

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
    essaysData: any;
    setEssayState: any;
}

interface CardState {
    data: tplotOptions
}

interface TabPanelProps {
    isHover: any;
    essay: any;
}


function HoverWord(props: TabPanelProps) {
    const { isHover, essay } = props;
    const CardWordsShow = 7;
    return (
        // TODO: to be get more meaningful parts of the title
        <Typography variant="h4" component="div">
            { isHover ? (
                Array.from(essay.title).length < CardWordsShow ? (
                    essay.title
                ) : (
                    `${essay.title.substring(0, CardWordsShow)}...`
                )
            ) : (
                essay.title.substring(0, 1)
            )}
        </Typography>
    );
}


class LeftSideCard extends React.Component<CardProps, CardState> {
    constructor(props: CardProps) {
        super(props);
    }

    changeEssay = (essay: any) => {
        this.props.setEssayState(essay)
    };

    render() {
        return (
            <div>
                {this.props.essaysData.map((k: any, _: number) => 
                    <EachCardEdge key={k.id}>
                        <CardNoSelect
                            onClick={() => this.changeEssay(k)}
                        >
                            <CardContentNoPadding> 
                                <HoverWord isHover={this.props.isHover} essay={k}></HoverWord>
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

const mapStateToProps = (state: any) => ({
    essaysData: state.essays.data
});


function mapDispatchToProps(dispatch: any) {
    return {
        setEssayState: (essay: any) => dispatch(setEssayState(essay))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideCard);
