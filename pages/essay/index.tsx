import { fetchEssays } from "posts/getSoftEssay";
import { wrapper } from "store";
import LeftSideBar from "components/layout/leftbar"
import MainPage from "components/layout/mainpage"
import { Container } from 'styles/softpageessay'


function SoftEssay(_props: any) {
    return (
        <Container>
            <LeftSideBar></LeftSideBar>
            <MainPage></MainPage>
        </Container>
    )
}
  

export const getStaticProps = wrapper.getStaticProps((store) =>
    async ({ _params }) => {
        // we can set the initial state from here
        // we are setting to false but you can run your custom logic here
        const essays = await store.dispatch(fetchEssays())
        return {
            props: {
                status: store.getState().essays.status,
                payload: essays.payload,
            }
        };
    }
);

export default SoftEssay;
