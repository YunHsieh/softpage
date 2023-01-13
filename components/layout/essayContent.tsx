import React from 'react';
import { connect } from 'react-redux';
import { setEssayState } from 'stores/softEssay';
import { CompareEssayContainer, TopContainer } from 'styles/mainpage';
import { updateEssay } from 'posts/getSoftEssay';

type tplotOptions = {
    [key: string]: string
}

interface ContentProps {
    content: string;
    iscompared: boolean;
    forwardedRef: any;
    updateEssay: any;
    essaysData: any;
    setEssayState: any;
    currentEssay: any;
}

interface ContentState {
    data: tplotOptions,
    currentEssay: any,
}


class EssayContent extends React.Component<ContentProps, ContentState> {
    contentRef: React.RefObject<unknown>;
    constructor(props: ContentProps) {
        super(props);
        this.contentRef = React.createRef();
    }

    changeEssay = (essay: any) => {
        this.props.setEssayState(essay)
    };

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
                    iscompared={this.props.iscompared}
                    onInput={this.changeEssayContent} 
                    ref={this.props.forwardedRef}
                >
                    {this.props.content}
                </CompareEssayContainer>
                {this.props.iscompared &&
                    <CompareEssayContainer
                        isright={true}
                        iscompared={this.props.iscompared}
                    >
                        {this.props.content}
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
});


function mapDispatchToProps(dispatch: any) {
    return {
        setEssayState: (essay: any) => dispatch(setEssayState(essay)),
        updateEssay: (essay: any) => dispatch(updateEssay(essay))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EssayContent);
