import React from 'react';
import SaveIcon from 'public/save.png'
import CompareIcon from 'public/compare.png'
import { connect } from 'react-redux';
import { setEssayState } from 'stores/softEssay';
import { GadgetContainer, GadgetItems, MyIcon, ToolsContainer } from 'styles/mainpageTools';

type tplotOptions = {
    [key: string]: string
}

interface GadgetProps {
    essaysData: any;
    setIsCompare: any;
    setEssayState: any;
    currentEssay: any;
}

interface GadgetState {
    data: tplotOptions,
    currentEssay: any,
}


class GadgetFunction extends React.Component<GadgetProps, GadgetState> {
    constructor(props: GadgetProps) {
        super(props);
    }

    changeEssay = (essay: any) => {
        this.props.setEssayState(essay)
        this.props.setIsCompare(true)
    };

    render() {
        return (
            <ToolsContainer>
                <GadgetContainer onClick={() => this.changeEssay({})}>
                    <GadgetItems>{'+'}</GadgetItems>
                </GadgetContainer>
                <GadgetContainer>
                    <GadgetItems>{'{}'}</GadgetItems>
                </GadgetContainer>
                <GadgetContainer>
                    <MyIcon 
                        src={SaveIcon} 
                        draggable="false" 
                        alt="Save your essay"
                    >
                    </MyIcon>
                </GadgetContainer>
                <GadgetContainer onClick={() => this.props.setIsCompare()}>
                    <MyIcon src={CompareIcon} draggable="false" alt="Compare your essay"></MyIcon>
                </GadgetContainer>
            </ToolsContainer>
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

export default connect(mapStateToProps, mapDispatchToProps)(GadgetFunction);
