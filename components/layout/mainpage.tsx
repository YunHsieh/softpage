import React from 'react';
import { connect } from 'react-redux';
import { ContentContainer, MainContainer, TagContainer, TitleContainer } from 'styles/mainpage';

interface EssayData {
    content: string;
    tags: Array<string>;
    title: string;
}

interface PageProps extends EssayData {
    currentEssay: any;
}

interface PageState {
}


class MainPage extends React.Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }
    render() {
        return (
            <MainContainer>
                {/* TODO: add tags */}
                <TagContainer>{this.props.tags}</TagContainer>
                <TitleContainer>{this.props.title}</TitleContainer>
                <ContentContainer>{this.props.content}</ContentContainer>
            </MainContainer>
        )
    }
}

const mapStateToProps = (state: any) => {
    const currentEssay = state.essays.currentEssay || {}
    return {
        tags: currentEssay.tags,
        title: currentEssay.title,
        content: currentEssay.content
    }
};

export default connect(mapStateToProps)(MainPage);
