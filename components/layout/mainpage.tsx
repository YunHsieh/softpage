import React from 'react';
import { connect } from 'react-redux';
import { setEssayState } from 'stores/softEssay';
import GadgetFunction from 'components/units/gadgets'
import { 
    EssayContainer, 
    MainPageContainer, 
    TagContainer, 
    TitleContainer
} from 'styles/mainpage';
import { createEssay, updateEssay } from 'posts/getSoftEssay'
import EssayContent from './essayContent';

interface EssayData {
    content: string;
    tags: Array<string>;
    title: string;
    id: string
}

interface PageProps extends EssayData {
    currentEssay: any;
    setEssayState: any;
    createEssay: any;
    updateEssay: any;
}

interface PageState {
    id: string,
    title: string,
}


class MainPage extends React.Component<PageProps, PageState> {
    contentRef: React.RefObject<any>;
    constructor(props: PageProps) {
        super(props);
        this.state = {
            title: this.props.title,
            id: this.props.id,
        }
        this.contentRef = React.createRef();
    }

    saveTitle = () => {
        if (!this.state.id) {
            this.props.createEssay({
                title: this.props.title,
            });
        } else {
            this.props.updateEssay({
                ...this.props.currentEssay,
                title: this.props.title,
            });
        }
    }

    handleKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            this.contentRef.current.focus()
            event.preventDefault()
            this.saveTitle()
        }
    }

    showTitle = () => {
        if (this.state.id !== this.props.id) {
            this.setState({
                id: this.props.id,
                title: this.props.title
            })
        } else {
            return this.state.title
        }
    };

    changeEssayTitle = (event: any) => {
        this.props.setEssayState({
            ...this.props.currentEssay,
            title: event.currentTarget.textContent,
        })
    };

    render() {
        return (
            <MainPageContainer>
                <EssayContainer>
                    {/* TODO: add tags */}
                    <TagContainer>
                        {this.props.tags}
                    </TagContainer>
                    {/* TODO: add placeholder */}
                    <TitleContainer 
                        onInput={this.changeEssayTitle}
                        onKeyDown={this.handleKeyDown}
                    >
                        {this.showTitle()}
                    </TitleContainer>
                    <GadgetFunction />
                    <EssayContent
                        saveTitle={this.saveTitle}
                        forwardedRef={this.contentRef} 
                    />
                </EssayContainer>
            </MainPageContainer>
        )
    }
}

const mapStateToProps = (state: any) => {
    const currentEssay = state.essays.currentEssay || {}
    return {
        currentEssay: currentEssay,
        id: currentEssay.id,
        tags: currentEssay.tags,
        title: currentEssay.title,
        content: currentEssay.content,
    }
};

function mapDispatchToProps(dispatch: any) {
    return {
        setEssayState: (essay: any) => dispatch(setEssayState(essay)),
        createEssay: (essay: any) => dispatch(createEssay(essay)),
        updateEssay: (essay: any) => dispatch(updateEssay(essay))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
