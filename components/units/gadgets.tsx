import React from 'react';
import SaveIcon from 'public/save.png'
import CompareIcon from 'public/compare.png'
import { connect } from 'react-redux';
import { GadgetUnit, GadgetItems, MyIcon, SavedContainer, GadgetComponents, GadgetsContainer, SavedCommentText, SavedDescText, SavedButton } from 'styles/mainpageTools';
import { setGadgetState } from 'stores/essayGadgetController';
import { resetCurrentEssay } from 'stores/softEssay'
import { Input } from '@mui/material';

interface GadgetProps {
    setGadgetState: any;
    resetCurrentEssay: any;
    currentEssay: any;
    isCompared: boolean;
    isParsed: boolean;
    isSaved: boolean;
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
            this.props.setGadgetState({
                isParsed: !this.props.isParsed,
                isSaved: false,
            })
            this.props.resetCurrentEssay()
        }
    }
    
    changeCompareState = () => {
        if (this.props.currentEssay.id) {
            this.props.setGadgetState({
                isCompared: !this.props.isCompared,
                isSaved: false,
            })
        }
    }

    changeSaved = () => {
        if (this.props.currentEssay.id) {
            this.props.setGadgetState({'isSaved': !this.props.isSaved})
        }
    }

    handleSaveClick = () => {
        this.props.setGadgetState({'isSaved': false})
    }

    render() {
        return (
            <GadgetsContainer>
                <GadgetComponents>
                    <GadgetUnit onClick={() => this.changeParseState()}>
                        <GadgetItems>{'{}'}</GadgetItems>
                    </GadgetUnit>
                    <GadgetUnit
                        onClick={() => this.changeSaved()}
                    >
                        <MyIcon 
                            src={SaveIcon} 
                            draggable="false" 
                            alt="Save your essay"
                        />
                    </GadgetUnit>
                    <GadgetUnit 
                        onClick={() => this.changeCompareState()}
                    >
                        <MyIcon 
                            src={CompareIcon} 
                            draggable="false" 
                            alt="Compare your essay" 
                        />
                    </GadgetUnit>
                </GadgetComponents>
                {
                    this.props.isSaved && 
                    <SavedContainer>
                        <SavedCommentText
                            onKeyDown={(event: any) => {
                                event.keyCode === 13 && event.preventDefault();
                            }}
                        >
                        </SavedCommentText>
                        <SavedDescText></SavedDescText>
                        <SavedButton onClick={this.handleSaveClick}> Save </SavedButton>
                    </SavedContainer>
                }
            </GadgetsContainer>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentEssay: state.essays.currentEssay,
    isCompared: state.essayGadGetSwtichers.isCompared,
    isParsed: state.essayGadGetSwtichers.isParsed,
    isSaved: state.essayGadGetSwtichers.isSaved,
});


function mapDispatchToProps(dispatch: any) {
    return {
        setGadgetState: (data: any) => dispatch(setGadgetState(data)),
        resetCurrentEssay: () => dispatch(resetCurrentEssay()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GadgetFunction);
