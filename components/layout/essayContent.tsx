import React from 'react';
import { connect } from 'react-redux';
import { setEssayState } from 'stores/softEssay';
import { CompareEssayContainer, EachSentences, TopContainer } from 'styles/mainpage';
import { updateEssay } from 'posts/getSoftEssay';

type tplotOptions = {
    [key: string]: string
}

interface ContentProps {
    content: string;
    isCompared: boolean;
    isParsed: boolean;
    forwardedRef: any;
    updateEssay: any;
    essaysData: any;
    setEssayState: any;
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
    const data = content.replace(/\.\n|\./gi, '.<newline>')
            .replace(/\n/gi, '<newline>')
            .split('<newline>')
    return (
        <>{ isParsed? data.map((s, i) => 
            <EachSentences key={i}>{s}</EachSentences>
        ): content}</>
    )
}


class EssayContent extends React.Component<ContentProps, ContentState> {
    contentRef: React.RefObject<unknown>;
    constructor(props: ContentProps) {
        super(props);
        this.state = {
            content: this.props.content,
        };
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
    render() {
        return (
            <TopContainer>
                <CompareEssayContainer
                    isCompared={this.props.isCompared}
                    onInput={this.changeEssayContent} 
                    ref={this.props.forwardedRef}
                >   
                    <DivideAllSentences 
                        content={this.props.content}
                        isParsed={this.props.isParsed}
                    >
                    </DivideAllSentences>
                </CompareEssayContainer>
                {this.props.isCompared &&
                    <CompareEssayContainer
                        isRight={true}
                        isCompared={this.props.isCompared}
                    >
                        {this.state.content}
                    </CompareEssayContainer>
                }
            </TopContainer>
        )
    }
}


const mapStateToProps = (state: any) => ({
    essaysData: state.essays.data,
    currentEssay: state.essays.currentEssay,
    content: state.essays.currentEssay.content,
    isCompared: state.essayGadGetSwtichers.isCompared,
    isParsed: state.essayGadGetSwtichers.isParsed,
});


function mapDispatchToProps(dispatch: any) {
    return {
        updateEssay: (essay: any) => dispatch(updateEssay(essay)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EssayContent);
