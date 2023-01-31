import React from 'react';
import SaveIcon from 'public/save.png'
import CompareIcon from 'public/compare.png'
import LinkIcon from 'public/link.png'
import { connect } from 'react-redux';
import { GadgetUnit, 
    GadgetItems, 
    MyIcon, 
    SavedContainer, 
    GadgetComponents, 
    GadgetsContainer, 
    SavedCommentText, 
    SavedDescText, 
    SavedButton } from 'styles/mainpageTools';
import { setGadgetState } from 'stores/essayGadgetController';
import { resetComparedEssay, resetCurrentEssay } from 'stores/softEssay'
import { resetCommitted, setCommitted } from 'stores/essayCommitted';
import { fetchCommittedEssays, fetchEditedEssays } from 'posts/getSoftEssay';
import { setUpdateAlertState } from 'stores/alertness';
import { ALERT_DISPLAY_TIME } from 'components/constants';

interface GadgetProps {
    setGadgetState: any;
    setUpdateAlertState: any;
    resetCurrentEssay: any;
    fetchCommittedEssays: any;
    fetchEditedEssays: any;
    resetComparedEssay: any;
    currentEssay: any;
    comment: string;
    setCommitted: any;
    resetCommitted: any;
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
        this.props.resetComparedEssay()
        if (this.props.currentEssay.id) {
            this.props.setGadgetState({
                isCompared: !this.props.isCompared,
                isSaved: false,
            })
            if (!this.props.isCompared) {
                this.props.fetchCommittedEssays({id: this.props.currentEssay.id})
                this.props.fetchEditedEssays({title: this.props.currentEssay.title})
            }
        }
    }

    changeSaved = () => {
        if (this.props.currentEssay.id) {
            this.props.setGadgetState({'isSaved': !this.props.isSaved})
        }
    }

    handleSaveClick = () => {
        if (this.props.comment) {
            this.props.setGadgetState({'isSaved': false})
            // TODO: Call api to save the committed
            this.props.resetCommitted()
        } else {
            this.props.setUpdateAlertState({
                isDisplay: true, 
                title: 'Enter Comment, Please',
            })
            setTimeout(() => this.props.setUpdateAlertState({isDisplay: false}), ALERT_DISPLAY_TIME)
        }
    }

    handleShare = () => {
        navigator.clipboard.writeText(`${window.location.href}${this.props.currentEssay.id}`)
        this.props.setUpdateAlertState({isDisplay: true, title: 'Copied Link'})
        setTimeout(() => this.props.setUpdateAlertState({isDisplay: false}), ALERT_DISPLAY_TIME)
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
                    <GadgetUnit 
                        onClick={() => this.handleShare()}
                    >
                        <MyIcon
                            src={LinkIcon} 
                            draggable="false" 
                            alt="Copy link into clipboard" 
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
                            onInput={(event: any) => this.props.setCommitted({'comment': event.currentTarget.textContent})}
                        />
                        <SavedDescText 
                            onInput={(event: any) => this.props.setCommitted({'description': event.currentTarget.textContent})}
                        />
                        <SavedButton onClick={this.handleSaveClick} isAllow={!!this.props.comment}> Save </SavedButton>
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
    comment: state.committed.comment,
    description: state.committed.description,
});


function mapDispatchToProps(dispatch: any) {
    return {
        setGadgetState: (data: any) => dispatch(setGadgetState(data)),
        resetCurrentEssay: () => dispatch(resetCurrentEssay({})),
        setCommitted: (data: any) => dispatch(setCommitted(data)),
        resetCommitted: () => dispatch(resetCommitted({})),
        fetchCommittedEssays: (data: any) => dispatch(fetchCommittedEssays(data)),
        fetchEditedEssays: (data: any) => dispatch(fetchEditedEssays(data)),
        resetComparedEssay: () => dispatch(resetComparedEssay({})),
        setUpdateAlertState: (alertState: any) => dispatch(setUpdateAlertState(alertState)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GadgetFunction);
