import React from 'react';
import { connect } from 'react-redux';
import { setEssayState } from 'stores/softEssay';
import { CompareEssayContainer, 
    EssayContainer, 
    MainPageContainer, 
    TagContainer, 
    TitleContainer, 
    TopContainer } from 'styles/mainpage';
import { createEssay, updateEssay } from 'posts/getSoftEssay'
import GadgetFunction from 'components/units/gadgets'

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
    title: string
    iscompared: boolean;
    isparser: boolean;
}


class MainPage extends React.Component<PageProps, PageState> {
    contentRef: React.RefObject<any>;
    constructor(props: PageProps) {
        super(props);
        this.state = {
            title: this.props.title,
            id: this.props.id,
            iscompared: false,
            isparser: false,
        }
        this.contentRef = React.createRef();
        this.handleIsCompare = this.handleIsCompare.bind(this)
    }

    handleIsCompare(isNew: boolean) {
        this.setState({
            iscompared: !isNew && !!this.props.id && !this.state.iscompared,
        })
    }

    handleKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            this.contentRef.current.focus()
            event.preventDefault()
            if (!this.state.id) {
                this.props.createEssay({
                    title: event.currentTarget.textContent
                });
            } else {
                this.props.updateEssay({
                    ...this.props.currentEssay,
                    title: event.currentTarget.textContent,
                });
            }
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

    changeEssayContent = () => {
        // NOTE: div could make double new line situation.
        let newText = ''
        Array.from(this.contentRef.current.childNodes).forEach((element: any) => {
            newText += element.textContent + '\n'
        });
        this.props.updateEssay({ 
            ...this.props.currentEssay,
            content: newText.substring(0, newText.length - 1),
        })
    };
    render() {
        return (
            <MainPageContainer>
                <EssayContainer>
                    {/* TODO: add tags */}
                    <TagContainer>{this.props.tags}</TagContainer>
                    {/* TODO: add placeholder */}
                    <TitleContainer 
                        onInput={this.changeEssayTitle}
                        onKeyDown={this.handleKeyDown}
                    >
                        {this.showTitle()}
                    </TitleContainer>
                    <TopContainer>
                        <GadgetFunction setIsCompare={this.handleIsCompare}></GadgetFunction>
                        <CompareEssayContainer
                            iscompared={this.state.iscompared}
                            onInput={this.changeEssayContent} 
                            ref={this.contentRef}
                        >
                            {this.props.content}
                        </CompareEssayContainer>
                        {this.state.iscompared &&
                            <CompareEssayContainer
                                isright={true}
                                iscompared={this.state.iscompared}
                            >
                                {this.props.content}
                            </CompareEssayContainer>
                        }
                    </TopContainer>
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
        content: currentEssay.content
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
