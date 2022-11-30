import React from 'react';
import { LeftBar, ContentEdge } from '../../styles/leftbar'
import LeftSideCard from '../units/card'

interface BarProps {
}

interface BarState {
}


class MainPage extends React.Component<BarProps, BarState> {
    constructor(props: BarProps) {
        super(props);
        this.state = {
            isHover: false
        };
    }
    onMouseSideExtention(ishover: any): void {
        this.setState({ 
            isHover: ishover
        });
    }

    render() {
      return (
        <LeftBar
            isHover={this.state.isHover}
            // if typescript change the state
            onMouseEnter={this.onMouseSideExtention.bind(this, true)}
            onMouseLeave={this.onMouseSideExtention.bind(this, false)}
        >
            <ContentEdge>
                <div style={{margin: '0px 5px'}}>
                    <LeftSideCard  isHover={this.state.isHover}></LeftSideCard>
                </div>
            </ContentEdge>
        </LeftBar>
      )
    }
  }

export default MainPage;
