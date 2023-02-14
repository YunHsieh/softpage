import { fetchEssays } from "posts/getSoftEssay";
import { AppDispatch } from "store";
import LeftSideBar from "components/layout/leftbar"
import MainPage from "components/layout/mainpage"
import UserAlert from 'components/layout/alertness'
import { Container } from 'styles/softpageessay'
import UserAuth from 'components/units/auth';
import { useDispatch } from "react-redux";


const SoftEssay = (_props: any) => {
    const dispatch = useDispatch<AppDispatch>();
    dispatch(fetchEssays())
    return (
        <Container>
            <LeftSideBar />
            <MainPage />
            <UserAlert />
            <UserAuth />
        </Container>
    )
}


export default SoftEssay;
