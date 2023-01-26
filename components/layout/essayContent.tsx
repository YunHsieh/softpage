import React from 'react';
import { connect } from 'react-redux';
import { 
    ComparedEssaysCard, 
    ComparedEssaysContainer, 
    CompareEssayContainer, 
    EachSentences, 
    TopContainer } from 'styles/mainpage';
import { updateEssay } from 'posts/getSoftEssay';
import moment from 'moment';
import { setComparedEssay } from 'stores/softEssay';

type tplotOptions = {
    [key: string]: string
}

interface ContentProps {
    content: string;
    editedData: any[],
    saveTitle: any;
    comparedEssay: any,
    isCompared: boolean;
    isParsed: boolean;
    forwardedRef: any;
    updateEssay: any;
    setComparedEssay: any;
    currentEssay: any;
}

interface ContentState {
    data: tplotOptions,
    currentEssay: any,
    content: string,
}

interface DivideSentence {
    content: string;
    isParsed: boolean;
}

const DivideAllSentences = (props: DivideSentence) => {
    const { content, isParsed } = props;
    let data = content
    if (isParsed) {
        data = data.replace(/\.\n|\./gi, '.<newline>')
            .replace(/\n/gi, '<newline>')
            .split('<newline>')
    }
    return (
        <>
            { isParsed? data.map((s: string, i: number) => 
                <EachSentences
                    // not allow user create new line
                    onKeyDown={(event: any) => {
                        event.keyCode === 13 && event.preventDefault();
                    }}
                    key={i}
                >{s}</EachSentences>
            ): content}
        </>
    )
}


class EssayContent extends React.Component<ContentProps, ContentState> {
    contentRef: React.RefObject<unknown>;
    constructor(props: ContentProps) {
        super(props);
        this.contentRef = React.createRef();
    }

    changeEssayContent = () => {
        // NOTE: div could make double new line situation.
        let newText = ''
        Array.from(this.props.forwardedRef.current.childNodes).forEach((element: any) => {
            newText += element.textContent + '\n'
        });
        this.props.updateEssay({ 
            ...this.props.currentEssay,
            content: newText.substring(0, newText.length - 1),
        })
    };

    handleChoiseCompareEssay = (essay: any) => {
        this.props.setComparedEssay(essay)
    }

    render() {
        return (
            <TopContainer>
                <CompareEssayContainer
                    onMouseDown={this.props.saveTitle}
                    isCompared={this.props.isCompared}
                    isParsed={this.props.isParsed}
                    onInput={this.changeEssayContent} 
                    ref={this.props.forwardedRef}
                >
                    <DivideAllSentences 
                        content={this.props.content}
                        isParsed={this.props.isParsed}
                    />
                </CompareEssayContainer>
                {this.props.isCompared &&
                    <CompareEssayContainer
                        isRight={true}
                        isCompared={this.props.isCompared}
                    >
                        {
                            this.props.comparedEssay?.content || 
                            Object.keys(this.props.editedData).map((key: string, i) => 
                                <ComparedEssaysContainer key={i} onClick={(e) => this.handleChoiseCompareEssay(this.props.editedData[key])}>
                                    <ComparedEssaysCard>
                                        <div>Editor: {this.props.editedData[key].author?.username}</div>
                                        <div>Update time: {moment(this.props.editedData[key].updated_at).format('YYYY-MM-DD HH:mm:ss')}</div>
                                    </ComparedEssaysCard>
                                </ComparedEssaysContainer>
                            )
                        }
                    </CompareEssayContainer>
                }
            </TopContainer>
        )
    }
}


const mapStateToProps = (state: any) => ({
    currentEssay: state.essays.currentEssay,
    content: state.essays.currentEssay.content,
    isCompared: state.essayGadGetSwtichers.isCompared,
    isParsed: state.essayGadGetSwtichers.isParsed,
    editedData: state.essays.editedData,
    comparedEssay: state.essays.comparedEssay,
});


function mapDispatchToProps(dispatch: any) {
    return {
        updateEssay: (essay: any) => dispatch(updateEssay(essay)),
        setComparedEssay: (essay: any) => dispatch(setComparedEssay(essay)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EssayContent);
