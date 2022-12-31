import React from 'react';
import { CardContent, Typography, styled } from '@mui/material';
import { EachCardEdge, CardContentNoPadding } from 'styles/card'
import { connect } from 'react-redux';
import { setEssayState } from 'stores/softEssay';

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
                `${essay.title.substring(0, 1)}...`
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
                        <CardContentNoPadding onClick={() => this.changeEssay(k)}> 
                            <HoverWord isHover={this.props.isHover} essay={k}></HoverWord>
                            <Typography 
                                variant="h4" 
                                component="div" 
                            >
                            </Typography>
                        </CardContentNoPadding>
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
