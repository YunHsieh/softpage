import React from 'react';
import { connect } from 'react-redux';
import { 
    ComparedEssaysCard, 
    ComparedEssaysContainer, 
    CompareEssayContainer, 
    EachSentences, 
    EditorRecommandedWords, 
    RemaindWords, 
    TopContainer } from 'styles/mainpage';
import { updateEssay } from 'posts/getSoftEssay';
import moment from 'moment';
import { setComparedEssay, setComparedParsed } from 'stores/softEssay';
import { lcs, showDifferenct } from 'helps/utils';

type tplotOptions = {
    [key: string]: string
}

interface ContentProps {
    content: string;
    historyData: any[];
    saveTitle: any;
    comparedEssay: any;
    isCompared: boolean;
    isParsed: boolean;
    forwardedRef: any;
    updateEssay: any;
    comparedParsed: string[];
    setComparedEssay: any;
    setComparedParsed: any;
    currentEssay: any;
}

interface ContentState {
    data: tplotOptions;
    currentEssay: any;
    content: string;
}

interface DivideSentence {
    content: string;
    isParsed: boolean;
    saveTitle: any;
    changeEssayContent: any;
    forwardedRef: any;
    isCompared: boolean;
    comparedParsed: string[];
}

interface ComparedResultProps {
    comparedParsed: any[];
}


const ComparedEssayResult = (props: ComparedResultProps) => {
    const { comparedParsed } = props;
    return (<>
        {comparedParsed.map((text: string, i: number) => {
            if (!text) {
                return 
            }
            if (text.match(/<deleted>/gi)) {
                return <RemaindWords key={i}>{text.replace(/<deleted>/gi, '')}</RemaindWords>
            } else if (text.match(/<fixed>/gi)) {
                return <EditorRecommandedWords key={i}>{text.replace(/<fixed>/gi, '')}</EditorRecommandedWords>
            } else {
                return text
            }
        })}
    </>)
}

const DivideAllSentences = (props: DivideSentence) => {
    const { 
        content, 
        isParsed, 
        isCompared, 
        comparedParsed,
        saveTitle,
        changeEssayContent,
        forwardedRef } = props;
    let data = content
    if (isParsed) {
        data = data.replace(/\.\n|\./gi, '.<newline>')
            .replace(/\n/gi, '<newline>')
            .split('<newline>')
    }
    return (
        <CompareEssayContainer
            onMouseDown={saveTitle}
            isCompared={isCompared}
            isParsed={isParsed}
            onInput={changeEssayContent}
            ref={forwardedRef}
        >
            { isParsed? data.map((s: string, i: number) => 
                <EachSentences
                    // not allow user create new line
                    onKeyDown={(event: any) => {
                        event.keyCode === 13 && event.preventDefault();
                    }}
                    key={i}
                >{s}</EachSentences>
            ): (isCompared && comparedParsed.length > 0)?
                <ComparedEssayResult comparedParsed={comparedParsed}/>
            : content}
        </CompareEssayContainer>
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
        const a = essay.content.replace(/(\w+)/gi, '<split>$1<split>').split('<split>')
        const b = this.props.currentEssay.content.replace(/(\w+)/gi, '<split>$1<split>').split('<split>')
        const [matrix, prev] = lcs(a, b)
        this.props.setComparedParsed(
            showDifferenct(a, b, matrix, prev)
        )
    }

    render() {
        return (
            <TopContainer>
                <DivideAllSentences
                    content={this.props.content}
                    isParsed={this.props.isParsed}
                    isCompared={this.props.isCompared}
                    comparedParsed={this.props.comparedParsed}
                    saveTitle={this.props.saveTitle}
                    changeEssayContent={this.changeEssayContent}
                    forwardedRef={this.props.forwardedRef}
                />
                {this.props.isCompared &&
                    <CompareEssayContainer
                        isRight={true}
                        isCompared={this.props.isCompared}
                    >
                        {
                            this.props.comparedEssay?.content || 
                            Object.keys(this.props.historyData).map((key: any, i) => 
                                 this.props.currentEssay.id === this.props.historyData[key].id ||
                                    <ComparedEssaysContainer 
                                        key={i} 
                                        onClick={() => this.handleChoiseCompareEssay(this.props.historyData[key])}
                                    >
                                        <ComparedEssaysCard>
                                            <div>Editor: {this.props.historyData[key].author?.username}</div>
                                            <div>Update time: {moment(this.props.historyData[key].updated_at).format('YYYY-MM-DD HH:mm:ss')}</div>
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
    historyData: state.essays.historyData,
    comparedEssay: state.essays.comparedEssay,
    comparedParsed: state.essays.comparedParsed,
});


function mapDispatchToProps(dispatch: any) {
    return {
        updateEssay: (essay: any) => dispatch(updateEssay(essay)),
        setComparedEssay: (essay: any) => dispatch(setComparedEssay(essay)),
        setComparedParsed: (essay: any) => dispatch(setComparedParsed(essay)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EssayContent);
