import React from 'react';
import { connect } from 'react-redux';
import { ContentContainer, MainContainer, TagContainer, TitleContainer } from 'styles/mainpage';

interface PageProps {
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
            <TagContainer>{this.props.currentEssay.tags.join(",")}</TagContainer>
            <TitleContainer>{this.props.currentEssay.title}</TitleContainer>
            <ContentContainer>{this.props.currentEssay.content}</ContentContainer>
            </MainContainer>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentEssay: state.essays.currentEssay
});


export default connect(mapStateToProps)(MainPage);
