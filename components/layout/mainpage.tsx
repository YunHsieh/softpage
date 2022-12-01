import React from 'react';
import { ContentContainer, MainContainer, TagContainer, TitleContainer } from '../../styles/mainpage';


interface PageProps {
}

interface PageState {
}


class LeftSideBar extends React.Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
        };
    }

    render() {
      return (
        <MainContainer>
          <TagContainer>Tags</TagContainer>
          <TitleContainer>Title</TitleContainer>
          <ContentContainer>My content</ContentContainer>
        </MainContainer>
      )
    }
  }

export default LeftSideBar;
