import LeftSideBar from "../../components/layout/leftbar";
import MainPage from "../../components/layout/mainpage";
import { Container } from '../../styles/softpageessay'


export default function MainPage() {
    return (
        <Container>
            <LeftSideBar></LeftSideBar>
            <MainPage></MainPage>
        </Container>
    )
}