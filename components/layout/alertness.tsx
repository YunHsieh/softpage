import React from 'react';
import { connect } from 'react-redux';
import { AlertContainer, AlertTitleContentStyle, AlertTitleStyle } from 'styles/alertness'

interface AlertProps {
    alert: any;
}

interface AlertState {
}


class UserAlert extends React.Component<AlertProps, AlertState> {
    constructor(props: AlertProps) {
        super(props);
    }

    render() {
        return (
            <>
                {
                    this.props.alert.isDisplay &&
                    <AlertContainer level={this.props.alert.level}>
                        <AlertTitleStyle> {this.props.alert.title} </AlertTitleStyle>
                        <AlertTitleContentStyle> {this.props.alert.content} </AlertTitleContentStyle>
                    </AlertContainer>
                }
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    alert: state.alert,
});

export default connect(mapStateToProps)(UserAlert);
