import { NextPage } from "next";
import { selectAuthState, setAuthState } from "stores/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "store";

const Home: NextPage = () => {
    const authState = useSelector(selectAuthState);
    const dispatch = useDispatch();
    return (
        <div>
            <div>{authState ? "Logged in" : "Not Logged In"}</div>
            <button
                onClick={() =>
                authState
                    ? dispatch(setAuthState(false))
                    : dispatch(setAuthState(true))
                }
            >
                {authState ? "Logout" : "LogIn"}
            </button>
        </div>
    );
};

export const getStaticProps = wrapper.getStaticProps((store) =>
    async ({ params }) => {
        // we can set the initial state from here
        // we are setting to false but you can run your custom logic here
        await store.dispatch(setAuthState(true)); 
        return {
            props: {
                authState: true,
            }
        };
    }
);

export default Home;
