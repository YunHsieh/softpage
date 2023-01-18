import React from 'react';
import SaveIcon from 'public/save.png'
import CompareIcon from 'public/compare.png'
import { connect } from 'react-redux';
import { GadgetContainer, GadgetItems, MyIcon, ToolsContainer } from 'styles/mainpageTools';
import { setGadgetState } from 'stores/essayGadgetController';
import { resetCurrentEssay } from 'stores/softEssay'

interface GadgetProps {
    setGadgetState: any;
    resetCurrentEssay: any;
    currentEssay: any;
    isCompared: boolean;
    isParsed: boolean;
}

interface GadgetState {
    currentEssay: any,
}


class GadgetFunction extends React.Component<GadgetProps, GadgetState> {
    constructor(props: GadgetProps) {
        super(props);
    }

    changeParseState = () => {
        if (this.props.currentEssay.id) {
            this.props.setGadgetState({'isParsed': !this.props.isParsed})
            this.props.resetCurrentEssay()
        }
    }

    changeCompareState = () => {
        if (this.props.currentEssay.id) {
            this.props.setGadgetState({'isCompared': !this.props.isCompared})
        }
    }

    render() {
        return (
            <ToolsContainer>
                <GadgetContainer onClick={() => this.changeParseState()}>
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
                <GadgetContainer 
                    onClick={() => this.changeCompareState()}
                >
                    <MyIcon src={CompareIcon} draggable="false" alt="Compare your essay"></MyIcon>
                </GadgetContainer>
            </ToolsContainer>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentEssay: state.essays.currentEssay,
    isCompared: state.essayGadGetSwtichers.isCompared,
    isParsed: state.essayGadGetSwtichers.isParsed,
});


function mapDispatchToProps(dispatch: any) {
    return {
        setGadgetState: (data: any) => dispatch(setGadgetState(data)),
        resetCurrentEssay: () => dispatch(resetCurrentEssay()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GadgetFunction);
