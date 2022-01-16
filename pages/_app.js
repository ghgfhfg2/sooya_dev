import Top from "@component/Top";
import "styles/globals.css";
import "antd/dist/antd.css";
import wrapper from "@redux/store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "@redux/actions/user_action";
import { auth } from "src/firebase";
import Router from "next/router";

function App({ Component, pageProps }) {
  let dispatch = useDispatch();
  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(setUser(user));
    } else {
      Router.push("/login");
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
