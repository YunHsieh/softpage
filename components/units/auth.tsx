import React from 'react';
import { connect } from 'react-redux';
import { 
    BgMaskContainer, 
    LoginBg, 
    LoginBox, 
    LoginImg, 
    LoginsContainer, 
    LoginTitle } from 'styles/authLogin';
import GoogleLoginIcon from 'public/google_icon.svg'
import { setUserLoginRequired } from 'stores/authAction';
import { googleAuth } from 'posts/authByGoogle';

interface authProps {
    auth: any;
    setUserLoginRequired: any;
}

interface authState {
}


class UserAuth extends React.Component<authProps, authState> {
    constructor(props: authProps) {
        super(props);
    }

    LoginCancelHandle = (e: any) => {
        if (e.target === e.currentTarget) {
            this.props.setUserLoginRequired({loginRequired: false})
        }
    }

    render() {
        return (
            <>
                {
                    this.props.auth.loginRequired &&
                    <BgMaskContainer onClick={this.LoginCancelHandle}>
                        <LoginsContainer>
                            <LoginBox>
                                <LoginTitle>Sign in to SoftEssay</LoginTitle>
                                <LoginBg onClick={(_) => this.props.googleAuth()}>
                                    <LoginImg
                                        src={GoogleLoginIcon} 
                                        draggable="false" 
                                        alt="Save your essay"
                                    />
                                    Sign in with Google
                                </LoginBg>
                            </LoginBox>
                        </LoginsContainer>
                    </BgMaskContainer>
                }
            </>
        )
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        googleAuth: () => dispatch(googleAuth()),
        setUserLoginRequired: (data: any) => dispatch(setUserLoginRequired(data)),
    };
}

const mapStateToProps = (state: any) => ({
    auth: state.auth,
});


export default connect(mapStateToProps, mapDispatchToProps)(UserAuth);
