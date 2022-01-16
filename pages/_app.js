import Top from "@component/Top";
import "styles/globals.css";
import "antd/dist/antd.css";
import wrapper from "@redux/store/configureStore";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@redux/actions/user_action";
import { auth } from "src/firebase";

function App({ Component, pageProps }) {
  let dispatch = useDispatch();
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(clearUser());
    }
  });
  return (
    <>
      <Top />
      <div id="content">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default wrapper.withRedux(App);
