import React from 'react';
import { Typography } from '@mui/material';
import { EachCardEdge, TextContainerInBar, TextInNavBar } from 'styles/card'
import { connect } from 'react-redux';
import { setEssayState } from 'stores/softEssay';

type tplotOptions = {
    [key: string]: string
}

interface CardProps {
    isHover: any;
    essaysData: any;
    setEssayState: any;
    currentEssay: any;
}

interface CardState {
    data: tplotOptions,
    currentEssay: any,
}

interface TabPanelProps {
    essay: any;
}


function HoverWord(props: TabPanelProps) {
    const { essay } = props;
    return (
        // TODO: to be get more meaningful parts of the title
        <TextInNavBar>
            {essay.title}
        </TextInNavBar>
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
                <div style={{borderBottom: "1px solid #555557"}}>
                    <EachCardEdge onClick={() => this.changeEssay({})}>
                        {/* <HoverWord isHover={this.props.isHover} essay={undefined}></HoverWord> */}
                        <Typography 
                            variant="h4" 
                            component="div"
                            align="center"
                            sx={{
                                paddingLeft: 0.5,
                            }}
                        > +
                        </Typography>
                    </EachCardEdge>
                </div>
                {this.props.essaysData.map((k: any, _: number) => 
                    <TextContainerInBar key={k.id} selected={k.id===this.props.currentEssay.id} onClick={() => this.changeEssay(k)}> 
                        <HoverWord essay={k}></HoverWord>
                    </TextContainerInBar>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    essaysData: state.essays.data,
    currentEssay: state.essays.currentEssay
});


function mapDispatchToProps(dispatch: any) {
    return {
        setEssayState: (essay: any) => dispatch(setEssayState(essay))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideCard);
